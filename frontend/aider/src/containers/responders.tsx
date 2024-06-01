
import { useEffect, useState } from "react"
import { responders } from "../assets/data/responders"
import { ResponderCard } from "../components/responder-card"

import "../styles/responders.css"
import { ResponderProp } from "../components/types/responderProp"
import { Coordinate, getDistance, getReport } from "../utils/factory"
import { ChatWindow } from "./chatWindow"
import axios from "axios"
import { getFirestoreDB } from "../config/firebase.config"
import { collection, onSnapshot } from "firebase/firestore"
import { User } from "./types/others/user"


const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

export const Responders = () =>{

    const [curr, setCurr] = useState<Coordinate>({lng: 0, lat: 0})

    const [respondersList, setRespondersList] = useState<(User & {coord: Coordinate, remoteId?: string})[]>([])

    useEffect(()=>{
        const reportId = getReport()
            getFirestoreDB()
            .then(async(db)=>{
            const ref = collection(db, `emergencies/${reportId}/responders`)
            onSnapshot(ref, (docs)=>{
                const data = docs.docs.map(d=>({...(d.data() as (User & {coord: Coordinate})), remoteId: d.id}))
                setRespondersList(data)
            })
            })

        navigator.geolocation.getCurrentPosition((pos)=>{
            setCurr({lng: pos.coords.longitude, lat: pos.coords.latitude})
        })
    },[])

    return <div className="responders">
        <button className="cancel-emergency" >Cancel Emergency</button>
        <ChatWindow />
        <h4 className="count-header" >Responders({respondersList.length})</h4>
        <div className="responders-list">
            {respondersList.map(r=>{
                console.log(r.remoteId, r)
                return <a style={{color: "unset"}} href={`/responders/${r.remoteId}`} ><ResponderCard curr={curr} key={r._id} responder={r} /></a>})}
        </div>
    </div> 
}