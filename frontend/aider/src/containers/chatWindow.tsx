import { ChatIcon } from "../components/chat-icon"
import {Icon} from "@iconify/react" 

import "../styles/chat-window.css"
import { messages } from "../assets/data/messages"
import { MessageCard } from "../components/message-card";
import { useState } from "react";

export const ChatWindow = ()=>{
    const [windowOpen, setWindowOpen] = useState<boolean>(false)

    const handleToggleChat = ()=>{
        console.log("clicked...")
        setWindowOpen(!windowOpen)
    }
    return <div className={`chat-window ${!windowOpen?"closed": ""}`}>
            <ChatIcon handleClick={handleToggleChat} count={1} />
            <div className="chat-frame">
                <section className="messages">
                    {messages.map(message=><div className="msg-wrapper" ><MessageCard message={message} /></div>)}
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