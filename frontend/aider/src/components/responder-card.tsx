import { Coordinate, getDistance } from "../utils/factory";
import { ResponderProp } from "./types/responderProp";


export const ResponderCard = (props: {responder: ResponderProp, curr: Coordinate})=>{
    return  <div className="responder-card">
                <img src={props.responder.img} alt="" />
                <div className="wrapper">
                    <p className="name">{props.responder.name}</p>
                    <p className="status">{getDistance(props.responder.coord, props.curr)}</p>
                </div>
            </div>
}