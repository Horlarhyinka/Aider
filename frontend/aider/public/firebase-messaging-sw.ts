// public/firebase-messaging-sw.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';
import {firebaseConfig} from "../src/config/config"

console.log("from SW:", firebaseConfig)
 
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload: any) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  (self as any).registration.showNotification(notificationTitle, notificationOptions);
});
