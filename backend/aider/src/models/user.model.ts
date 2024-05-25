import mongoose from "mongoose";
import { UserSchema } from "./types/user";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema<UserSchema>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: { type: String, required: true},
    about: {type: String, }
}, {timestamps: true})

userSchema.pre("save", async function(){
    if(this.isNew || this.isModified("password")){
        this.password = await hashPassword(this.password)
    }
})

userSchema.pre("findOneAndUpdate", async function(){
    const updates = this.getUpdate()
    if((updates as any)["password"]){
        this.setUpdate({...updates, password: await hashPassword((updates as any)["password"])})
      }
})

async function hashPassword(raw: string){
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(raw, salt)
    return hashed
}