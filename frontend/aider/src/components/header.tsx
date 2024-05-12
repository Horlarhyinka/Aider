import "../styles/header.css"
import Logo from "../assets/img/logo.png";

export const Header = (prop: {isAuthenticated: boolean})=>{
    return <div className="header">
        <div className="logo-wrapper">
            <img src={Logo} alt="" />
            <h1>AIDER</h1>
        </div>
        <ul className="links">
            <a href=""><li>Home</li></a>
            <a href=""><li>Dashboard</li></a>
            <a href=""><li>Emergencies</li></a>
            <a href=""><li>Rewards</li></a>
        </ul>
    </div>
}