import { Map } from "../components/map"
import { Icon } from "@iconify/react/dist/iconify.js"

import "../styles/respond.css"
import { ChatWindow } from "./chatWindow"
import { AuthHOC } from "../utils/HOC"
import { useEffect, useState } from "react"
import { Emergency } from "./types/others/emergency"
import { useParams } from "react-router-dom"
import { authRequest, Coordinate, getAuthToken, getDistance, getResponding, getUser, popResponding, setResponding } from "../utils/factory"
import axios from "axios"
import { getFirestoreDB } from "../config/firebase.config"
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { User } from "./types/others/user"

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

export const Respond = AuthHOC(()=>{
    interface WithRemoteId extends Emergency{
        remoteId: string
    }
    const [emergency, setEmergency] = useState<Emergency | WithRemoteId>()
    const [coord, setCoord] = useState<Coordinate>({lng: 0, lat: 0})
    const [isResponding, setIsResponding] = useState<boolean>(false)
    const [isOnScene, setIsOnScene] = useState<boolean>(false)
    const [responders, setResponders] = useState<(User & {coord: Coordinate})[]>([])

    const {id} = useParams()
        const url = apiBaseUrl + `/emergencies/${id}`
    useEffect(()=>{
        authRequest(()=>axios.get(url, {headers: { Authorization: `Bearer ${getAuthToken()}`}}))
        .then(async(res)=>{
            setEmergency(res.data)
            if(emergency){
            if(+getDistance(coord, emergency!.coord) == 0){
                setIsOnScene(true)
                }else{
                    setIsOnScene(false)
                }
            }
        if(getResponding(id!)){
            setIsResponding(true)
        }

        const db = await getFirestoreDB()
        const ref = collection(db, `emergencies/${id}/responders`)
        const docs = await getDocs(ref)
        const initColl: (any & {coord: Coordinate})[] = []
        docs.forEach(d=>{
            initColl.push({...d.data(), remoteId: d.id})
        })
        setResponders(initColl)
        onSnapshot(ref, async(docs)=>{
            const user = await getUser()
            const curr: (any & {coord: Coordinate})[] = []
            docs.forEach(doc=>{curr.push({...doc.data(), remoteId: doc,id})})
            setResponders(curr.filter(r=>r._id !== user?._id))
            if(emergency){
                console.log({emergency})
                if(+getDistance(coord, emergency!.coord) == 0){
                    setIsOnScene(true)
                    }else{
                        setIsOnScene(false)
                    }
                }
                })
        })
        .catch((err: any)=>{
            console.log(err)
            alert(err.response?.data)
        })


    },[id])

        navigator.geolocation.getCurrentPosition((pos)=>{
            setCoord({lng: pos.coords.longitude, lat: pos.coords.latitude})
            if(emergency){
                if(+getDistance(coord, emergency!.coord) == 0){
                    setIsOnScene(true)
                    }else{
                        setIsOnScene(false)
                    }
                }
        })

    async function handleRespondNow(){
        if(getResponding(id!))return
        if(!coord){
            return
        }
        
        authRequest(()=>axios.post(url + "/responders", {coord}, {headers: {Authorization: `Bearer ${getAuthToken()}`}}))
        .then(res=>{
            setResponding(id!, res.data.remoteId)
            setIsResponding(true)
            setEmergency(res.data)
        })
        .catch(err=>{
            console.log({err}, err.response?.data)
        })   
    }


    navigator.geolocation.watchPosition(async(pos)=>{
        const newCoord = {lng: pos.coords.longitude, lat: pos.coords.latitude}
        setCoord(newCoord)
        if(emergency){
            if(+getDistance(coord, emergency!.coord) == 0){
                setIsOnScene(true)
                }else{
                    setIsOnScene(false)
                }
            }
        const user = getUser()
        const db = await getFirestoreDB()
        const collectionRef = collection(db,`emergencies/${id}/responders`)
        const meta = where("_id", "==", user!._id)
        const q = query(collectionRef, meta)
        const docs = await getDocs(q)
        const data = docs.docs.map(d=>({...(d.data() as (User & {coord: Coordinate})), remoteId: d.id}))
        const target = data[0]
        if(target){
            const docRef = doc(db,`emergencies/${id!}/responders/${target.remoteId}`)
            try{
                await updateDoc(docRef, {coord: newCoord})
            }catch(err){
                console.log({err})
            }
        }

    })


    return emergency?<div className="respond">
        <h4 className="name">{emergency.name}</h4>
        <p className="description">{emergency.description}</p>
        
        {!isResponding && <button onClick={()=>{handleRespondNow()}} className={`cta`} >respond now <Icon className="icn" icon={"icon-park-twotone:alarm"} /></button>}
        
         {(isResponding && !isOnScene) && <button disabled
         className={`cta rs`} ><Icon className="icn" icon={"mdi:location"} /> ${getDistance(coord!, emergency.coord)}km away</button>}

         {(isResponding && isOnScene) &&<button disabled
         className={`cta rs on-scene`} ><Icon className="icn" icon={"mdi:location"} /> on scene</button>}
        <ChatWindow />
        <Map curr={coord || {lng: 0, lat: 0}} target={emergency.coord} points={responders} />
    </div>:<div className="null spinner" >loading emergency information...</div>
})