import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { appConfig } from "../config/config"
import { UserModel } from "../models/user.model"
import { AuthRequest } from "../utils/types"

export const authenticate = async(req: Request, res: Response, next: NextFunction) =>{
    function sendUnauthenticated(message: string = "unauthenticated"){
        return res.status(401).json({message})
    }
    try{
        const h = req.headers.authorization
        if(!h)return sendUnauthenticated('provide bearer token is required')
        const [prefix, token] = h.split(" ")
        if(prefix.toLowerCase() !== "bearer")return sendUnauthenticated("token must be of type bearer")
        const {id } = await jwt.verify(token, appConfig.secret!) as {id: string, type: string}
        if(!id)return sendUnauthenticated("invalid token")
        const user = await UserModel.findById(id)
        if(!user)return res.status(404).json({message: "user not found"});
        (req as AuthRequest).user = user
        next()
    }catch(err){
        console.log("auth error:", err)
        return sendUnauthenticated()
    }

}