import mongoose from "mongoose"
import { dbConfig } from "./config"

export const connectDB = async(): Promise<void> =>{
    if(!dbConfig.url){
        console.log("FATAL ERROR: DB CONNECTION STRING NOT PROVIDED")
        process.exit(1)
    }
    try{
    await mongoose.connect(dbConfig.url)
    console.log("connected to database")

    }catch(ex){
        console.log("failed to connect to DB:",ex)
    }
}