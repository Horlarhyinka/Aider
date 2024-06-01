import { ReportMadeProps } from "./types/props/reportMadeProps";
import Kit from "../assets/img/kit.png"

import '../styles/report-made.css';
import { ChatWindow } from "./chatWindow";
import { getReport } from "../utils/factory";


export const ReportMade = (props: ReportMadeProps) =>{

    setTimeout(()=>{
        const report = getReport()
        if(report){
            window.location.assign(`/responders`)
        }
    }, 5000)

    return <div className="report-made">
        <h4>Help is on the way</h4>
        <ChatWindow />
        <p className="danger" >please dial 911 (or your local emergency response line) while you wait for help to get to you</p>
        <img src={Kit} alt="kit" />
        <button className="cta">view responders</button>
    </div>
}