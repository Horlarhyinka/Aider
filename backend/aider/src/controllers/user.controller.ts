import {Request, Response} from 'express'
import catchAsyncErrors from '../libs/catchAsyncErrors'
import userService from '../services/user.service'

export const getUsers = catchAsyncErrors(async(req: Request, res: Response) =>{
    const {active} = req.query
    if(active){
        return res.status(200).json(await userService.getActiveUsers())
    }
    return res.status(200).json(await userService.getUsers())
})

export const getUser = catchAsyncErrors(async(req: Request, res: Response) =>{
    const {userId} = req.params
    const user =  await userService.getById(userId)
    if(!user)return res.status(404).json({message: 'user not found.'})
    return res.status(200).json(user)
})

export const updateUser = catchAsyncErrors(async(req: Request, res: Response) =>{
    const { userId } = req.params
    const user = await userService.getById(userId)
    if(!user)return res.status(404).json({message: 'User not found.'})
    const payload = {...req.body}
    delete payload.password
    delete payload._id
    delete payload.email
    const updated = await userService.updateUser(userId, {...req.body})
    return  res.status(200).json(updated)
})

export const toggleStatus = catchAsyncErrors(async(req: Request, res: Response) =>{
    const { userId } = req.params
    const user = await userService.getById(userId)
    if(!user)return res.status(404).json({message: 'User not found.'})
    const updated = await userService.updateUser(userId, {isActive: !user.isActive})
    return  res.status(200).json(updated)
})