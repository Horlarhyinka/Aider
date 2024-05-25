import dotenv from "dotenv"

dotenv.config()

export const appConfig = {
    port: process.env.PORT || 8001,
    host: process.env.HOST || "localhost",
    secret: process.env.APP_SECRET
}

export const dbConfig = {
    url: process.env.DB_URL
}