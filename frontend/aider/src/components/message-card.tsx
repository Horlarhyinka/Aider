import { MessageProp } from "./types/messageProp";

import "../styles/message-card.css"


export const MessageCard = (props: {message: MessageProp}) =>{
    return <div className="message-card">
        { <div className="user">
            <p>{props.message.message}</p>
        </div> }
        <p className="message-content">{props.message.body}</p>
    </div>
}