import { ResponderOverviewProp } from "./types/responderOverviewProp"

import { Icon } from "@iconify/react/dist/iconify.js"

import "../styles/responder-overview-card.css"


export const ResponderOverviewCard = (prop: ResponderOverviewProp)=>{
    return <div className="responder-overview-card">
        <img src={prop.avatar} alt="" className="avatar" />
        <div className="wrapper">
            <h4>{prop.name}</h4>
            <p className="about">{prop.about}</p>
            <div className="sub">
                <Icon className="icn" icon={"mdi:location"} />
                <span className="distance">{prop.distance}km</span>
            </div>
        </div>
    </div>
}