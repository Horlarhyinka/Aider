import { Document } from "mongoose";

export interface UserSchema{
    firstName: string
    lastName: string
    email: string
    password: string
    skill: string
    about: string

    checkPassword: (text: string)=>Promise<boolean>
    generateToken: ()=>Promise<string>
}