import { UserSchema } from "../models/types/user";
import { pick, Topics } from "../utils/factory";
import { FirebaseService, firebaseService as fbService } from "./firebase.service";
import { Document } from "mongoose";

class EmergencyService {

    constructor(
        private firebaseService: FirebaseService  = fbService,
    ){}

    addResponder(emergencyId: string, user: Document<UserSchema>){
        const path = `emergencies/${emergencyId}/responders`
        const cp = {...user} as any
        delete cp["password"]
        return this.firebaseService.sendToFirebase(path, {...pick(user, Object.keys(cp))})
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

    postMessage(emergencyId: string, message: object){
        const path = `emergencies/${emergencyId}/chats`
        return this.firebaseService.sendToFirebase(path, message)
    }

    subscribe(token: string){
        return this.firebaseService.subscribeDevice(token, Topics.emergency)
    }

    sendBroadcast(){
        return this.firebaseService.sendPushNotification(Topics.emergency, {
            title: "Emergency Alert!!!",
            data: "There is a medical emergency and we need your help!!!"
        })
    }
}

export const emergencyService = new EmergencyService()