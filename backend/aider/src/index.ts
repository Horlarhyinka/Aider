import express from "express"
import helmet from "helmet"
import cors from "cors"
import http from "http"
import { connectDB } from "./config/db.config"
import { appConfig } from "./config/config"
import authRouter from "./routers/auth.router"

const app = express()

app.use(helmet())
app.use(cors({origin: "*"}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/v1/auth", authRouter)

async function start(){
    const server = http.createServer(app)
    server.on("listening", ()=>{
        console.log(`server running on port ${(server.address() as {port: number}).port}...`)
    })
    await connectDB()
    server.listen(appConfig.port)
}

start()