import { UserSchema } from "../models/types/user";
import { pick, Topics } from "../utils/factory";
import { FirebaseService, firebaseService as fbService } from "./firebase.service";
import { Document } from "mongoose";
import mailerService from "./mailer.service";

class EmergencyService {

    constructor(
        private firebaseService: FirebaseService  = fbService,
    ){}

    async addResponder(emergencyId: string, user: Document<UserSchema>){
        const path = `emergencies/${emergencyId}/responders`
        const cp = {...user} as any
        delete cp["password"]
        await this.firebaseService.sendToFirebase(path, {...pick(user, Object.keys(cp))})
        const responder = await this.firebaseService.queryFirebase(path, {_id: user._id?.toString()})
        return responder
    }

    removeResponder(emergencyId: string, userRemoteId: string){
        const path = `emergencies/${emergencyId}/responders`
        return this.firebaseService.removeFromFireBase(path, userRemoteId)
    }

    getResponders(emergencyId: string){
        const path = `emergencies/${emergencyId}/responders`
        return this.firebaseService.queryFirebase(path)
    }

    getResponder(emergencyId: string, responderRemoteId: string){
        const path = `emergencies/${emergencyId}/responders/${responderRemoteId}`
        return this.firebaseService.queryFirebase(path)
    }

    getChats(emergencyId: string){
        const path = `emergencies/${emergencyId}/chats`
        return this.firebaseService.queryFirebase(path)
    }

    getInferenceChats(emergencyId: string){
        const path = `emergencies/${emergencyId}/inference-chats`
        return this.firebaseService.queryFirebase(path)
    }

    postMessage(emergencyId: string, message: object){
        const path = `emergencies/${emergencyId}/chats`
        return this.firebaseService.sendToFirebase(path, message)
    }

    postInferenceMessage(emergencyId: string, message: object){
        const path = `emergencies/${emergencyId}/inference-chats`
        return this.firebaseService.sendToFirebase(path, message)
    }



    subscribe(token: string){
        return this.firebaseService.subscribeDevice(token, Topics.emergency)
    }

    async sendBroadcast(emails?: string[]){
        //send email
        // await this.firebaseService.sendPushNotification(Topics.emergency, {
        //     title: "Emergency Alert!!!",
        //     data: "There is a medical emergency and we need your help!!!"
        // })
        // if(emails)return Promise.all(emails.map(addr=>mailerService.sendEmergencyAlert(addr)))
    }
}

export const emergencyService = new EmergencyService()