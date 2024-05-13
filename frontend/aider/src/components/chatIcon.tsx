import "../styles/chat-icon.css"
import Draggable from "react-draggable"

export const ChatIcon = (prop: {count: number})=>{
    return <Draggable>
            <div className="chat-icon">
                <hr className="f" />
                <hr className="s" />
                {prop.count && <span>{prop.count}</span>}
            </div>
            </Draggable>
}