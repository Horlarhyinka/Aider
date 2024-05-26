import dotenv from "dotenv"

dotenv.config()

export const appConfig = {
    port: process.env.PORT || 8001,
    host: process.env.HOST || "localhost",
    secret: process.env.APP_SECRET!
}

export const dbConfig = {
    url: process.env.DB_URL
}

export const firebaseConfig = {
    apiKey: "AIzaSyAjjQGVJJmRhg37me6TRzoy4hhnE6pg_N8",
    authDomain: "aider-ece4a.firebaseapp.com",
    projectId: "aider-ece4a",
    storageBucket: "aider-ece4a.appspot.com",
    messagingSenderId: "245507022179",
    appId: "1:245507022179:web:a75b45aa1ceb9dfa534756",
    measurementId: "G-J230CLDRHL"
  };