import { Document, ObjectId } from "mongoose";
import { EmergencySchema } from "./emergency";

export interface UserSchema{
    firstName: string
    lastName: string
    email: string
    password: string
    skill: string
    about: string
    experience: number
    isActive: boolean
    telephone: string
    featured: (string | ObjectId | EmergencySchema)[]
    checkPassword: (text: string)=>Promise<boolean>
    generateToken: ()=>Promise<string>
}