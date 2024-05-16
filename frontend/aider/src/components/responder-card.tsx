import { Coordinate, getDistance } from "../utils/factory";
import { ResponderProp } from "./types/responderProp";

import "../styles/responder-card.css"
import { Icon } from "@iconify/react/dist/iconify.js";


export const ResponderCard = (props: {responder: ResponderProp, curr: Coordinate})=>{
    const distance = getDistance(props.responder.coord, props.curr)
    return  <div className={`responder-card ${parseFloat(distance) < 0.2?"on-scene": ""}`}>
                <img src={props.responder.img} alt="" />
                <div className="wrapper">
                    <p className="name">{props.responder.name}</p>
                    <p className="status">{parseInt(distance) == 0? "on scene":distance + "  away."}</p>
                </div>
                <Icon className="location-icn" icon={"mdi:location"} />
            </div>
}