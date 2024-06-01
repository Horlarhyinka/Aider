import "../styles/header.css"
import Logo from "../assets/img/logo.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export const Header = (prop: {isAuthenticated: boolean})=>{
    const [navOpen, setNavOpen] = useState<boolean>(false)

    const toggleNav = () =>{setNavOpen(!navOpen)}
    return <>
    <div className="header">
        <div className="logo-wrapper">
            <img src={Logo} alt="" />
            <h1>AIDER</h1>
        </div>
        <ul className="links">
            <a href="/"><li>Home</li></a>
            <a href="/dashboard"><li>Dashboard</li></a>
            <a href="/emergencies"><li>Emergencies</li></a>
        </ul>
        <Icon onClick={toggleNav} className="menu icn" icon="ci:menu-duo-md"  style={{color: "white"}} />
    </div>
   {navOpen && <ul className="nav-links">
            <a href="/"><li>Home</li></a>
            <a href="/dashboard"><li>Dashboard</li></a>
            <a href="/emergencies"><li>Emergencies</li></a>
        </ul>}
    </>
}