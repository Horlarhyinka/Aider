import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp } from "firebase/firestore";
import { getFirestoreDB } from "../config/firebase.config";
import { cleanObjectIds, cleanUndefined } from "../utils/cleaners";


export class FirebaseService {



    async sendToFirebase(path: string, data: object){
        //clean data  before sending...
        data = cleanUndefined(cleanObjectIds(data))
        const firestore = await getFirestoreDB()
        const docRef = collection(firestore, path)
        await addDoc(docRef, data)
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

}

export const firebaseService = new FirebaseService()