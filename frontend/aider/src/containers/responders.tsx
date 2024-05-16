
import { useEffect, useState } from "react"
import { responders } from "../assets/data/responders"
import { ResponderCard } from "../components/responder-card"

import "../styles/responders.css"
import { ResponderProp } from "../components/types/responderProp"
import { getDistance } from "../utils/factory"

export const Responders = () =>{

    const curr = {lng: 1.22, lat: 1.47}

    const [respondersList, setRespondersList] = useState<ResponderProp[]>([])

    useEffect(()=>{
        setRespondersList(responders.sort((a,b)=>{
            return parseFloat(getDistance(a.coord, curr)) - parseFloat(getDistance(b.coord, curr))
        }))
    },[ responders])

    return <div className="responders">
        <button className="cancel-emergency" >Cancel Emergency</button>
        <h4 className="count-header" >Responders({11})</h4>
        <div className="responders-list">
            {respondersList.map(r=><ResponderCard curr={curr} key={r.id} responder={r} />)}
        </div>

    </div>
}