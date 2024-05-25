import { emergencies } from "../assets/data/emergencies"
import { EmergencyCard } from "../components/emergency-card"

export const Emergencies = () =>{
    return <div className="emergencies">
        {emergencies.map(e=><EmergencyCard name={e.name} description={e.description} coord={e.coord} />)}
    </div>
}