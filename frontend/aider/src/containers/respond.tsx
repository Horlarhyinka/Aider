import { Map } from "../components/map"
import { Icon } from "@iconify/react/dist/iconify.js"

import "../styles/respond.css"
import { ChatWindow } from "./chatWindow"

export const Respond = ()=>{
    return <div className="respond">
        <h4 className="name">Henry J Martinez</h4>
        <p className="description">An Old man just collapsed and started bleeding through his nose, I need immediate response please, everyone on scene is afraid to get close.'
        </p>
        
        <button className="cta" >respond now <Icon className="icn" icon={"icon-park-twotone:alarm"} /></button>
        <ChatWindow />
        <Map curr={{lng: 1.11, lat: 12.14}} points={[]} />
    </div>
}