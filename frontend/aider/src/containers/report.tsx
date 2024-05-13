import "../styles/report.css"
import { ReportProps } from "./types/props/reportProps"

export const Report = (props: ReportProps) =>{
    return <form action="" className="report-form">
        <h1>Report Emergency</h1>
        <div className="field-wrapper">
            <label htmlFor="name" >Full name <span className="danger" >*</span></label>
            <input type="text" name="name" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="report" >describe your emergency <span className="danger" >*</span></label>
            <textarea name="report" ></textarea>
        </div>
        <button className="cta pry-color-light">Report emergency</button>
    </form>
}