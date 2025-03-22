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
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  export const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT

  export const firebaseServiceAccount = {
    type: process.env.FIREBASE_TYPE!,
    project_id: process.env.FIREBASE_PROJECT_ID!,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID!,
    private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL!,
    client_id: process.env.FIREBASE_CLIENT_ID!,
    auth_uri: process.env.FIREBASE_AUTH_URI!,
    token_uri: process.env.FIREBASE_TOKEN_URI!,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL!,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL!,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN!
  }

  export const googleAiConfig = {
    apiKey: process.env.GEMINI_API_KEY
  }

  export const mailConfig = {
    auth: {user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    },
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE
}

console.log({mailConfig})