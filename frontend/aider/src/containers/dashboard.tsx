import { ProfileCard } from "../components/profile-card"
import Avatar from "../assets/img/jaden.jpeg"
import { BadgeCard } from "../components/badge-card"
import { Map } from "../components/map"
import { useState } from "react"
import { Coordinate } from "../utils/factory"
import { emergencies } from "../assets/data/emergencies"

import "../styles/dashboard.css"
import "../styles/index.css"
import { Icon } from "@iconify/react/dist/iconify.js"


export const Dashboard = ()=>{
    const [curr, setCurr] = useState<Coordinate>({lng:0, lat:0})
    navigator.geolocation.getCurrentPosition((pos)=>{
        setCurr({lng: pos.coords.longitude, lat: pos.coords.latitude})
    })
    return <div className="dashboard">
        <ProfileCard name={"testing Kernel"} about="I test anything testable" avatar={Avatar} />
        <div className="badges">
        <BadgeCard count={14} title="First responder Badge" />
        <BadgeCard count={14} title="Mitigation Badge" />
        <BadgeCard count={14} title="Remote aid Badge" />
        </div><br/>
        <button className="cta pry-color-light">view emergencies <Icon icon={"icon-park-twotone:alarm"} style={{"fontSize": "18px"}} /></button>
        <Map curr={curr} points={emergencies} />
    </div>
}