const fbService = require('../services/firebase')
const aiService = require("../services/ai")
const { ai } = require('../config')

const collectionName = "Chats"

class ChatService{
    constructor(){

    }
    async postMessage(obj){
        const {id} = await fbService.createOne(obj.emergencyId, {emergencyId: obj.emergencyId, body: obj.body, postedBy: obj.userId, postedAt: Date.now()})
        const message = await fbService.getById(obj.emergencyId, id)
        return {...message.data(), id: message.id}
    }
    async generateResponse(data){
        const userMessage = await this.postMessage({userId: data.userId, emergencyId: data.emergencyId, body: data.body})
        const aiRes = await aiService.handleChatResponse(data.body)
        const aiMessage = await this.postMessage({userId: ai.id, body: aiRes, postedBy: ai.id, postedAt: Date.now(), emergencyId: data.emergencyId})
        return {message: userMessage, response: aiMessage};
    }
    async getMessages(chatId){
        const { docs } = await fbService.getAll(collectionName, {chatId})
        return docs.map(m=>({...m.data(), id: m.id}))
    }
}

const chatService = new ChatService()

module.exports = Object.freeze(chatService)