import { useEffect, useState } from "react"
// import { emergencies } from "../assets/data/emergencies"
import { EmergencyCard } from "../components/emergency-card"
import { AuthHOC } from "../utils/HOC"
import { Emergency } from "./types/others/emergency"
import axios from "axios"
import { authRequest, getAuthToken } from "../utils/factory"


const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

export const Emergencies = AuthHOC(() =>{
const url = apiBaseUrl + "/emergencies"
const [emergencies, setEmergencies] = useState<Emergency[]>([])
    useEffect(()=>{
        authRequest(()=>axios.get(url, {headers: { Authorization: `Bearer ${getAuthToken()}` }}))
        .then(res=>{
            setEmergencies(res.data)
        })
        .catch(err=>{
            console.log({err})
        })
    }, [])
    return <div className="emergencies">
        {emergencies.map(e=><a style={{textDecoration: "none", color: "unset"}} href={"/emergencies/"+e._id}><EmergencyCard name={e.name} description={e.description} coord={e.coord} /></a>)}
    </div>
})