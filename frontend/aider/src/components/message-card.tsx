import { MessageProp } from "./types/messageProp";

import "../styles/message-card.css"


export const MessageCard = (props: {message: MessageProp}) =>{
    return <div className="message-card">
        <div className="user">
            {/* <img src={props.message.sentBy.avatar} alt="user" /> */}
            {/* <p>{props.message.sentBy.name}</p> */}
        </div>
        <p className="message-content">{props.message.content}</p>
    </div>
}