import { ProfileCard } from "../components/profile-card"
import { BadgeCard } from "../components/badge-card"
import { Map } from "../components/map"
import { useState } from "react"
import { Coordinate, getAbout, getUser } from "../utils/factory"
import { emergencies } from "../assets/data/emergencies"
import PHImg from "../assets/img/PHImg.jpeg"

import "../styles/dashboard.css"
import "../styles/index.css"
import { Icon } from "@iconify/react/dist/iconify.js"
import { AuthHOC } from "../utils/HOC"

export const Dashboard = AuthHOC(()=>{
    const [curr, setCurr] = useState<Coordinate>({lng:0, lat:0})
    navigator.geolocation.getCurrentPosition((pos)=>{
        setCurr({lng: pos.coords.longitude, lat: pos.coords.latitude})
    })

    const user = getUser()!

    return <div className="dashboard">
        <ProfileCard name={user.firstName + " " + user.lastName} about={getAbout()!} avatar={user.avatar || PHImg} />
        <div className="badges">
        <BadgeCard count={14} title="First responder Badge" />
        <BadgeCard count={14} title="Mitigation Badge" />
        <BadgeCard count={14} title="Remote aid Badge" />
        </div><br/>
        <button onClick={()=>{
            window.location.assign("/emergencies")
        }} className="cta pry-color-light">view emergencies <Icon icon={"icon-park-twotone:alarm"} style={{"fontSize": "18px"}} /></button>
        <Map curr={curr} points={emergencies} />
    </div>
})
