import { useRef, RefObject } from "react"
import "../styles/register.css"
import axios from "axios"
import { tokenName } from "../utils/factory"

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

export const Login = () =>{

    const formRef = useRef() as RefObject<HTMLFormElement>
    async function handleSubmit(){
        const formData = new FormData(formRef.current!)
        const data = Object.fromEntries(formData.entries())
        const url = apiBaseUrl + "/auth/login"
        try {

        const response = await axios.post(url, {...data})
        if(!response.status.toString().startsWith("2")){
            alert("authentication failed" + response.data.message)
            return
        }
        const { token, user } = response.data
        localStorage.setItem(tokenName, token) 
        localStorage.setItem("user", JSON.stringify(user))
        if(window.location.href.includes("login")){
            window.location.assign("/dashboard")
        }else{
            window.location.reload()
        }
        } catch (error: any) {
            console.log(error)
            alert(error.response?.data?.message)
        }
    }

    return <div className="login register">
        <form ref={formRef} action="" className="pry-form">
        <h1>Login</h1>
        <div className="field-wrapper">
            <label htmlFor="email" >email <span className="danger" >*</span></label>
            <input required type="text" name="email" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="password" >password <span className="danger" >*</span></label>
            <input required type="password" name="password" />
        </div>
        <button
        onClick={(e)=>{
            e.preventDefault()
            handleSubmit()
        }}
        >Login</button>
        <p>not a member? <a href="register" >click to join community</a></p>
        </form>
    </div>
}