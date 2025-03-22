import { Response, Request } from "express";
import catchAsyncErrors from "../libs/catchAsyncErrors";
import { emergencyValidator } from "../validators/emergency.validator";
import { EmergencyModel } from "../models/emergency.model";
import { emergencyService } from "../services/emergency.service";
import { AuthRequest } from "../utils/types";
import { ObjectId } from "mongoose";
import aiService from "../services/ai.service";
import { inferencePrompt } from "../utils/prompts";
import aiConfig from "../config/ai.config";
import userService from "../services/user.service";
import { formatInferenceConversationPrompt, formatRoomConversationPrompt } from "../utils/helper";


export const reportEmergency = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validationRes = emergencyValidator.validateEmergencyPayload(req.body)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const emergency = await EmergencyModel.create({...req.body})
    let prompt = `Reported by ${emergency.name} \n\n${emergency.description}`
    prompt = inferencePrompt + prompt
    const aiInference = await aiService.queryModel(prompt)
    await emergencyService.postInferenceMessage((emergency as any)._id.toString(), { text: aiInference, userId: aiConfig.id, name: aiConfig.username, avatar: aiConfig.avatar})
    await emergencyService.postMessage((emergency as any)._id.toString(), { text: aiInference, userId: aiConfig.id, name: aiConfig.username, avatar: aiConfig.avatar})
    const activeUsers = await userService.getUsers()
    await emergencyService.sendBroadcast(activeUsers.map(u=>u.email))
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
    const {userId } = req.query
    if(userId){
        const user = await userService.getById(userId.toString())
        if(!user)return res.status(404).json({message: "user not found"})
        const {featured: featuredEmergencies} = await user.populate('featured')
        return res.status(200).json(featuredEmergencies)
    }
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
    const user = await userService.getById(req.user._id)
    if(!user)return res.status(404).json({message: 'User not found.'})
    user.featured = Array.from(new Set([...(user.featured ?? []), emergency]))
    await user.save()
    const remoteDoc = await emergencyService.addResponder((emergency._id as ObjectId).toString(), {...req.user.toObject(), coord: req.body.coord})
    const resObj = remoteDoc[0]
    return res.status(200).json(resObj)
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
    const {inference, tagAi} = req.query
    if(!id)return res.status(400).json({message: "emergency id is required"})
    const validateRes = emergencyValidator.validatePostMessagePayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const emergency = await EmergencyModel.findById(id)
    if(!emergency)return res.status(404).json({message: "emergency not found"})
    if(inference){
        await emergencyService.postInferenceMessage((emergency._id as ObjectId).toString(), req.body)
        const prompt = await formatInferenceConversationPrompt(id)
        const aiRes = await aiService.queryModel(prompt)
        await emergencyService.postInferenceMessage((emergency as any)._id.toString(), { text: aiRes, userId: aiConfig.id, name: aiConfig.username, avatar: aiConfig.avatar})

    }else{
    await emergencyService.postMessage((emergency._id as ObjectId).toString(), req.body)
    if(tagAi?.toString().toLowerCase() == 'true'){
        const prompt = await formatRoomConversationPrompt(id)
        const aiRes = await aiService.queryModel(prompt)
        await emergencyService.postMessage((emergency as any)._id.toString(), { text: aiRes, userId: aiConfig.id, name: aiConfig.username, avatar: aiConfig.avatar})
    }

    }
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

// EmergencyModel.deleteMany({}).then(res=>{console.log("deleted...")})
