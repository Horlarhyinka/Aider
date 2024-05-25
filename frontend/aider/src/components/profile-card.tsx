import { ProfileCardProp } from "./types/profileCardProp"

import "../styles/profile-card.css"

export const ProfileCard = (prop: ProfileCardProp) =>{
    return <div className="profile-card">
        <img src={prop.avatar} alt={prop.name} />
        <div className="c-wrapper">
            <p className="name">{prop.name}</p>
            <p className="about">{prop.about}</p>
        </div>
    </div>
}