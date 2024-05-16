
import { responders } from "../assets/data/responders"

import "../styles/responders.css"

export const Responders = () =>{

    return <div className="responders">
        <button className="cancel-emergency" >Cancel Emergency</button>
        <h4 className="count-header" >Responders({11})</h4>
        <div className="responders-list">
            {}
        </div>

    </div>
}