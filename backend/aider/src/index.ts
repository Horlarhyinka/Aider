import express from "express"
import helmet from "helmet"
import cors from "cors"
import http from "http"
import { connectDB } from "./config/db.config"
import { appConfig } from "./config/config"
import authRouter from "./routers/auth.router"
import emergencyRouter from "./routers/emergency.router"
import userRouter from './routers/user.router'

const app = express()

app.use(helmet())
app.use(cors({origin: appConfig.mode == 'production'?[appConfig.client]:"*"}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/emergencies", emergencyRouter)
app.use('/api/v1/users', userRouter)

async function start(){
    const server = http.createServer(app)
    server.on("listening", ()=>{
        console.log(`server running on port ${(server.address() as {port: number}).port}...`)
    })
    await connectDB()
    server.listen(appConfig.port)
}

start()