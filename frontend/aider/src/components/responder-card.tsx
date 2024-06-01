import { Coordinate, getDistance } from "../utils/factory";
import { ResponderProp } from "./types/responderProp";

import "../styles/responder-card.css"
import { Icon } from "@iconify/react/dist/iconify.js";
import PHImg from "../assets/img/PHImg.jpeg"


export const ResponderCard = (props: {responder: ResponderProp, curr: Coordinate})=>{
    const distance = getDistance(props.responder.coord, props.curr)
    return  <div className={`responder-card ${parseFloat(distance) < 0.2?"on-scene": ""}`}>
                <img src={props.responder.img || PHImg} alt="" />
                <div className="wrapper">
                    <p className="name">{props.responder.firstName} {props.responder.lastName}</p>
                    <p className="status">{parseInt(distance) == 0? "on scene":distance + "  away."}</p>
                </div>
                <Icon className="location-icn" icon={"mdi:location"} />
            </div>
}