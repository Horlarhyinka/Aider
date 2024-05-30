import { Request } from "express"
import { UserSchema } from "../models/types/user"

export interface Coordinate{
    lng: number
    lat: number
}

export interface AuthRequest extends Request{
    user: Document<UserSchema>
}

export interface PushMessage{
    title: string
    data: string
}