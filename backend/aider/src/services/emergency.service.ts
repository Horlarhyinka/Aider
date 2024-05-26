import { UserSchema } from "../models/types/user";
import { FirebaseService, firebaseService as fbService } from "./firebase.service";

class EmergencyService {

    constructor(
        private firebaseService: FirebaseService  = fbService,
    ){}

    addResponder(emergencyId: string, user: UserSchema){
        const path = `emergencies/${emergencyId}/responders`
        return this.firebaseService.sendToFirebase(path, {...user, password: undefined})
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

}

export const emergencyService = new EmergencyService()