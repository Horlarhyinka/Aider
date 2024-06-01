const dotenv = require("dotenv")

dotenv.config()

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }


  const gemini = {
    apiKey: process.env.GEMINI_API_KEY
  }

  const ai = {
    id: "99857",
    username: "aider",
}

module.exports = {
    firebase: firebaseConfig,
    gemini,
    ai,
}