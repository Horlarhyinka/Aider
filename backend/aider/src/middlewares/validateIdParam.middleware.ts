import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";


export const validateId = (req: Request, res: Response, next: NextFunction)=>{
    for(let key in req.params){
        if(key.toLowerCase().endsWith("id")){
            if(!mongoose.Types.ObjectId.isValid(req.params[key]))return res.status(400).json({message: `${key} is invalid`})
        }
    }
    next()
}