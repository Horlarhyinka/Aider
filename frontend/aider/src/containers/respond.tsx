import { Map } from "../components/map"
import { Icon } from "@iconify/react/dist/iconify.js"

import "../styles/respond.css"
import { ChatWindow } from "./chatWindow"
import { AuthHOC } from "../utils/HOC"
import { useEffect, useState } from "react"
import { Emergency } from "./types/others/emergency"
import { useParams } from "react-router-dom"
import { authRequest, Coordinate, getAuthToken, getResponding, getUser, setResponding } from "../utils/factory"
import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

export const Respond = AuthHOC(()=>{
    interface WithRemoteId extends Emergency{
        remoteId: string
    }
    const [emergency, setEmergency] = useState<Emergency | WithRemoteId>()
    const [coord, setCoord] = useState<Coordinate>()
    const [isResponding, setIsResponding] = useState<boolean>(false)
    const [isOnScene, setIsOnScene] = useState<boolean>(false)

    const {id} = useParams()
        const url = apiBaseUrl + `/emergencies/${id}`
    useEffect(()=>{
        authRequest(()=>axios.get(url, {headers: { Authorization: `Bearer ${getAuthToken()}`}}))
        .then(res=>{
            setEmergency(res.data)
        if(getResponding(id!)){
            setIsResponding(true)
        }
        })
        .catch((err: any)=>{
            alert(err.response?.data)
        })
    },[id])

        navigator.geolocation.getCurrentPosition((pos)=>{
            setCoord({lng: pos.coords.longitude, lat: pos.coords.latitude})
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
    return emergency?<div className="respond">
        <h4 className="name">{emergency.name}</h4>
        <p className="description">{emergency.description}</p>
        
        <button
        onClick={()=>{handleRespondNow()}}
         className={`cta ${isResponding && "rs"}`} >respond now <Icon className="icn" icon={"icon-park-twotone:alarm"} /></button>
        <ChatWindow />
        {/* <Map curr={{lng: 1.11, lat: 12.14}} target={emergency.coord} points={[]} /> */}
    </div>:<div className="null spinner" >loading emergency information...</div>
})