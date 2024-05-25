import "../styles/chat-icon.css"
import Draggable from "react-draggable"

export const ChatIcon = (prop: {count: number, handleClick: Function})=>{
    return <div onClick={()=>{
        console.log("clicked...")
        prop.handleClick()
        }} className="chat-icon">
                <hr className="f" />
                <hr className="s" />
                {prop.count && <span>{prop.count}</span>}
            </div>

}