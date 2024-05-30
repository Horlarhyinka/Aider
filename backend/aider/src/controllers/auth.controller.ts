import {Request, Response} from "express"
import catchAsyncErrors from "../libs/catchAsyncErrors"
import { userValidator } from "../validators/user.validator"
import { UserModel } from "../models/user.model"
import { emergencyService } from "../services/emergency.service"

export const register = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validateRes = userValidator.validateRegisterPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const user = await UserModel.create({...req.body})
    if(req.body.deviceToken){
    await emergencyService.subscribe(req.body.deviceToken)
    }
    return res.status(201).json({user: {...user.toObject(), password: undefined, token: await user.generateToken()}})
})

export const login = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validateRes = userValidator.validateLoginPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const user = await UserModel.findOne({email: req.body.email})
    if(!user)return res.status(404).json({message: "user not found"})
    const passwordCorrect = await user.checkPassword(req.body.password)
    if(!passwordCorrect)return res.status(400).json({message: "incorrect password"})
    if(req.body.deviceToken){
        await emergencyService.subscribe(req.body.deviceToken)
        }
    return res.status(200).json({user: {...user.toObject(), password: undefined}, token: await user.generateToken()})
})


// UserModel.deleteMany().then(()=>{console.log("cleared")})