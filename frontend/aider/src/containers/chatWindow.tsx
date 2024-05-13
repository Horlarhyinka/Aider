import { ChatIcon } from "../components/chatIcon"
import {Icon} from "@iconify/react" 

import "../styles/chat-window.css"

export const ChatWindow = ()=>{
    return <div className="chat-window">
        <ChatIcon count={1} />
        <div className="chat-frame">
            <section className="messages">
                
            </section>
            <section className="input-section">
            <div className="chat-input-wrapper">
                <input placeholder="type your message" type="text" className="message-input" />
                <Icon className="icn" icon="ion:send" />
            </div>
            </section>
        </div>
    </div>
}