import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp } from "firebase/firestore";
import {getFirebaseAdmin, getFirestoreDB } from "../config/firebase.config";
import { cleanObjectIds, cleanUndefined } from "../utils/cleaners";
import { PushMessage } from "../utils/types";
import { getMessaging } from "firebase/messaging";


export class FirebaseService {


    async sendToFirebase(path: string, data: object){
        //clean data  before sending...
        data = cleanUndefined(cleanObjectIds(data))
        const firestore = await getFirestoreDB()
        const docRef = collection(firestore, path)
        await addDoc(docRef, {...data, createdAt: Date.now()})
    }

    async queryFirebase(path: string, condition: object = {}, operator?: WhereFilterOp){
        const firestore = await getFirestoreDB()
        const cond = Object.entries(condition)[0];
        const meta = cond ? where(cond[0], operator || '==', cond[1]) : undefined;
        const q = meta? query( collection(firestore, path), meta): query( collection(firestore, path), );
        const docSnap = await getDocs(q);
        const data = docSnap.docs.map(d=>({...d.data(), remoteId: d.id}));
        return data
    }

    async getFromFirebase(path: string, remoteId: string){
        const firestore = await getFirestoreDB()
        const docRef = doc(firestore, `${path}/${remoteId.toString()}`)
        const target = await getDoc(docRef)
        return target
    }

    async removeFromFireBase(path: string, remoteId: string){
        try{

        const firestore = await getFirestoreDB()
        const docRef = doc(firestore, `${path}/${remoteId.toString()}`)
        await deleteDoc(docRef)
        return true

        }catch(ex){
            console.log("failed to delete from firebase:", ex)
            return false
        }
    }

    async subscribeDevice(token: string | string[], topic: string){
        try {
            const admin = await getFirebaseAdmin()
            await admin.messaging().subscribeToTopic(token, topic)
            return true  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async sendPushNotification(topic: string, data: PushMessage){
        try {
            const admin = await getFirebaseAdmin()
            const payload = {
                notification: data,
                data: {data: data.data}
            }
            const response = await admin.messaging().sendToTopic(topic, {
                notification: {title: data.title},
                data: {
                    data: data.data
                }
            })
            console.log("push message sent successfully", response.messageId)
        } catch (error) {
            console.log("failed to send push notification:", error)
        }
    }
}

export const firebaseService = new FirebaseService()