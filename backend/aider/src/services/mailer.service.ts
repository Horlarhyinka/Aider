import nodemailer from "nodemailer"
import * as config from '../config/config'
import ejs from "ejs"
import path from "path"


export const mailTypes = {
    custom: "custom",
    disaster_alert: "disaster_alert",
    forget_password: "forget_password",
    newsletter: "newsletter",
    onboarding: "onboarding",
    verification: "verification",
}

const getPath = (fileName: string) =>{
    return path.join(__dirname, `/templates/${fileName}.ejs`)
}

class Mailer{
    transporter
    from_address
    constructor(){
        //@ts-ignore
        this.transporter = nodemailer.createTransport({
            ...config.mailConfig
        })
        // this.from_address = config.mail.auth.user
        this.from_address = "tester@gmail.com"
    }

    loadTemplate(path: string, data: object){
        return ejs.renderFile(path, data)
    }

    sendMail(email: string, html: string, subject="Aider Emergency"){
        return this.transporter.sendMail({
            to: email,
            from: this.from_address,
            html,
            subject
        })
    }

    sendEmergencyAlert(email: string){
        return this.sendMail(email, `<h1>There is an emergency and we need your help.</h1>`)
    }
}

export default Object.freeze(new Mailer())