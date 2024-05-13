import { ReportMadeProps } from "./types/props/reportMadeProps";
import Kit from "../assets/img/kit.png"

import '../styles/report-made.css';
import { ChatIcon } from "../components/chatIcon";
import { ChatWindow } from "./chatWindow";


export const ReportMade = (props: ReportMadeProps) =>{

    return <div className="report-made">
        <h4>Help is on the way</h4>
        <ChatWindow />
        <p className="danger" >please dial 911 (or your local emergency response line) while you wait for help to get to you</p>
        <img src={Kit} alt="kit" />
        <button className="cta">view responders</button>
    </div>
}