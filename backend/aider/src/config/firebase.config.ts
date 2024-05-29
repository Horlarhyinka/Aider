import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import admin from "firebase-admin"
import path from "path"

export async function getFirestoreDB (){
    try{
        const app = await initializeApp(firebaseConfig)
        return getFirestore(app)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

export async function getFirebaseAdmin(){

var serviceAccount = require(path.resolve(__dirname, "../../fb-service-account.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

return admin

}