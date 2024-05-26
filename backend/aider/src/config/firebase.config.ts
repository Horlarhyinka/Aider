import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase/firestore";


export async function getFirestoreDB (){
    try{
        const app = await initializeApp(firebaseConfig)
        return getFirestore(app)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
