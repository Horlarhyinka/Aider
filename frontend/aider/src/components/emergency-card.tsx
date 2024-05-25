import { EmergencyCardProp } from "./types/emergencyCardProp"
import { Map } from "./map"

import "../styles/emergency-card.css"


export const EmergencyCard = (prop: EmergencyCardProp)=>{
    return <div className="emergency-card">
        <h4>{prop.name}</h4>
        <p>{prop.description}</p>
        <div className="coord-wrapper">
            <Map curr={prop.coord} points={[]}  />
        </div>
    </div>
}