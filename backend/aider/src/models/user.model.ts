import mongoose from "mongoose";
import { UserSchema } from "./types/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { appConfig } from "../config/config";
import { mailRegexp } from "../utils/regexp";
import './emergency.model'

const userSchema = new mongoose.Schema<UserSchema>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, match: mailRegexp, unique: true},
    password: { type: String, required: true, minlength: 6},
    about: {type: String, },
    skill: { type: String, required: true},
    isActive: {type: Boolean, default: false},
    experience: {type: Number, required: true},
    telephone: {type: String, required: false},
    featured: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'emergency'
    }
}, {timestamps: true})

userSchema.methods.generateToken = async function(){
    const payload = {id: this._id.toString()}
    return jwt.sign(payload, appConfig.secret, {expiresIn: "2d"})
}

userSchema.methods.checkPassword = async function(text: string){
    return bcrypt.compare(text, this.password)
}
 
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

export const UserModel = mongoose.model("user", userSchema)