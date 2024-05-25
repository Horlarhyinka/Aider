import { BadgeCardProp } from "./types/badgeCardProp";
import { Icon } from "@iconify/react/dist/iconify.js";

import "../styles/badge-card.css"


export const BadgeCard = (prop: BadgeCardProp) =>{
    return <div className="badge-card">
        <p className="title">{prop.title}</p>
        <Icon icon={"marketeq:badge"} style={{color: "#D9B600"}} className="icn" />
        <p className="count">{prop.count}</p>
    </div>
}