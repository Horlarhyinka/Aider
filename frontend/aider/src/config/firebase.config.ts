import firebase, {initializeApp} from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "./config";

const vapidKey = import.meta.env.VITE_APP_VAPID_PUBLIC_KEY!

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app)

export async function getDeviceToken() {
    return getToken(messaging, {vapidKey})
    .then(async(currentToken?: string)=>{
        if(!currentToken){
            const permission = await Notification.requestPermission()
            if(permission === "granted"){
                const token = await getToken(messaging, {vapidKey})
                return token
            }else{
                getDeviceToken()
            }
        }else{
            return currentToken
        }
    })
}