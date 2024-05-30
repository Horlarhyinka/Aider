
import React, { useRef } from "react"
import axios from "axios"
import "../styles/register.css"
import "../styles/report.css"
import { tokenName } from "../utils/factory"
import { getDeviceToken } from "../config/firebase.config"

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

export const Register = () =>{
    const categoryOptions = [
        {title: "professional doctor, emt, nurse,...", value: "professional"},
        {title: "I received a formal training (through university, college, scholl of nurses...)", value: "formal"},
        {title: "I received an informal training, (apprenticeship, community service...)", value: "informal"},
        {title: "I have no medical training experience", value: "none"}

    ]

    const formRef = useRef() as React.RefObject<HTMLFormElement>

    async function handleSubmit(){
        const url = apiBaseUrl + "/auth/register"
        try {
            const formData = new FormData(formRef.current!)
            const data = Object.fromEntries(formData.entries())
            const deviceToken = await getDeviceToken()
            console.log({deviceToken})
            const response = await axios.post(url, {...data, deviceToken})
            if(response.status !== 201){
                alert(response.data.message)
                return
            }
            const { token, user } = response.data
            window.localStorage.setItem(tokenName, token) 
            window.localStorage.setItem("user", JSON.stringify(user))
            if(window.location.href.includes("register")){
                window.location.assign("/dashboard")
            }else{
                window.location.reload()
            }
        } catch (error: any) {
            console.log("authentication error", error.response?.data.message, {error})
        }
    }


 return <div className="register">
    <form ref={formRef} action="" className="pry-form">
        <h1>Join our community</h1>
        <div className="field-wrapper">
            <label htmlFor="firstName" >First name <span className="danger" >*</span></label>
            <input required type="text" name="firstName" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="lastName" >Last name <span className="danger" >*</span></label>
            <input required type="text" name="lastName" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="email" >email <span className="danger" >*</span></label>
            <input required type="text" name="email" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="category" >do you have any medical training experience? <span className="danger" >*</span></label>
            <select name="category" required >
            {categoryOptions.map((opt, i)=><option title={opt.title} value={opt.value} key={i} >{opt.title}</option>)}
            </select>
        </div>
        <div className="field-wrapper">
            <label htmlFor="password" >Password <span className="danger" >*</span></label>
            <input type="password" name="password" />
        </div>
        <button
        onClick={(e)=>{
            e.preventDefault()
            handleSubmit()
        }}
         className="btn-pry" >Join community</button>
        <p>already a member? <a href="/login" >login here</a></p>
    </form>
 </div>   
}