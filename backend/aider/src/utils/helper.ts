import { emergencyService } from "../services/emergency.service"
import { inferenceResponsePrompt, roomResponsePrompt } from "./prompts"

export const formatRoomConversationPrompt = async(emergencyId: string) =>{
    const formatted = await getlastXEmergencyChats(emergencyId)
    const prompt = roomResponsePrompt + formatted
    return prompt
}


export const formatInferenceConversationPrompt = async(emergencyId: string) =>{
    const formatted = await getlastXEmergencyInference(emergencyId)
    const prompt = inferenceResponsePrompt + formatted
    return prompt
}


async function getlastXEmergencyChats(emergencyId: string, x: number = 10){
    const all = await emergencyService.getChats(emergencyId)
    const sorted = all.sort((a: any,b: any)=>a.createdAt - b.createdAt)
    let formatted = ``
    sorted.slice(0, x).forEach((d: any)=>{
        formatted += `

        sent By: ${d.name}  \n

        sent Image: ${Boolean(d.image)} \n

        message: ${d.text}  \n
        

        `
    })
    return formatted
}

async function getlastXEmergencyInference(emergencyId: string, x: number = 10){
    const all = await emergencyService.getInferenceChats(emergencyId)
    const sorted = all.sort((a: any,b: any)=>b.createdAt - a.createdAt)
    let formatted = ``
    sorted.slice(0, x).forEach((d: any)=>{
        formatted += `

        sent By: ${d.name}  \n

        sent Image: ${Boolean(d.image)} \n

        message: ${d.text}  \n
        

        `
    })
    return formatted
}