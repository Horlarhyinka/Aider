import { RefObject, useRef, useState } from "react"
import "../styles/report.css"
import { ReportProps } from "./types/props/reportProps"
import { Coordinate, setReport } from "../utils/factory"
import axios from "axios"


const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8001/api/v1"

export const Report = (props: ReportProps) =>{
    const [coord, setCoord] = useState<Coordinate>({lng: 0, lat: 0})
    navigator.geolocation.getCurrentPosition((pos)=>{
        setCoord({lng: pos.coords.longitude, lat: pos.coords.latitude})
    })
    const formRef = useRef() as RefObject<HTMLFormElement>
    async function handleNewReport(){
        const formData = new FormData(formRef.current!)
        const data = Object.fromEntries(formData.entries())

        const response = await axios.post(apiBaseUrl+"/reports", {...data, coord})
        if(response.status.toString().startsWith("2")){
            setReport(response.data._id)
            window.location.assign("/report-made")
        }

    }
    return <form ref={formRef} action="" className="report-form">
        <h1>Report Emergency</h1>
        <div className="field-wrapper">
            <label htmlFor="name" >Full name <span className="danger" >*</span></label>
            <input required type="text" name="name" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="report" >describe your emergency <span className="danger" >*</span></label>
            <textarea required name="report" ></textarea>
        </div>
        <button className="cta pry-color-light">Report emergency</button>
    </form>
}