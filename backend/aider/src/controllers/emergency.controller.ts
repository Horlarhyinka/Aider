import { Response, Request } from "express";
import catchAsyncErrors from "../libs/catchAsyncErrors";
import { emergencyValidator } from "../validators/emergency.validator";
import { EmergencyModel } from "../models/emergency.model";
import { emergencyService } from "../services/emergency.service";
import { AuthRequest } from "../utils/types";
import { ObjectId } from "mongoose";


export const reportEmergency = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validationRes = emergencyValidator.validateEmergencyPayload(req.body)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const emergency = await EmergencyModel.create({...req.body})
    await emergencyService.sendBroadcast()    
    return res.status(201).json(emergency)
})

export const getEmergency = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "provide a valid emergency ID"})
    const target = await EmergencyModel.findById(id)
    if(!target)return res.status(404).json({message: "emergency not found"})
    return res.status(200).json(target)
})

export const getEmergencies = catchAsyncErrors(async(req: Request, res: Response)=>{
    const emergencies = await EmergencyModel.find({active: true})
    return res.status(200).json(emergencies)
})

export const respondToEmergency = catchAsyncErrors(async(req: AuthRequest, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "emergency id is required"})
    const validateRes = emergencyValidator.validateRespondToEmergencyPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const emergency = await EmergencyModel.findById(id)
    if(!emergency)return res.status(404).json({message: "emergency not found"})
    await emergencyService.addResponder((emergency._id as ObjectId).toString(), {...req.user.toObject()})
    return res.status(200).json(emergency)
})

export const cancelEmergency = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "emergency id is required"})
    const validateRes = emergencyValidator.validateCancelEmergencyPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const canceled = await EmergencyModel.findByIdAndUpdate(id, {active: false, remark: req.body.remark})
    return res.status(200).json(canceled)
})

//just in case there is a need to post and get messages using REST API (current implementation uses firebase from the frontend)
export const postMessage = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "emergency id is required"})
    const validateRes = emergencyValidator.validatePostMessagePayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const emergency = await EmergencyModel.findById(id)
    if(!emergency)return res.status(404).json({message: "emergency not found"})
    await emergencyService.postMessage((emergency._id as ObjectId).toString(), req.body)
    return res.status(200).json(emergency)
})

export const getChats = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "emergency id is required"})
    const emergency = await EmergencyModel.findById(id)
    if(!emergency)return res.status(404).json({message: "emergency not found"})
    const chats = await emergencyService.getChats((emergency._id as ObjectId).toString())
    return res.status(200).json(chats)
})

