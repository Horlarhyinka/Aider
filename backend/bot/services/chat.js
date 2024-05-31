const fbService = require('../services/firebase')
const aiService = require("../services/ai")
const { ai } = require('../config')

const collectionName = "Chats"

class ChatService{
    constructor(){

    }
    async postMessage(obj){
        const {id} = await fbService.createOne(collectionName, {chatId: obj.userId, body: obj.body, postedBy: obj.userId, postedAt: Date.now()})
        const message = await fbService.getById(collectionName, id)
        return {...message.data(), id: message.id}
    }
    async generateResponse(userId, body){
        const userMessage = await this.postMessage({userId, body})
        const aiRes = await aiService.handleChatResponse(body)
        const aiMessage = await this.postMessage({userId: ai.id, body: aiRes, postedBy: ai.id, postedAt: Date.now()})
        return {message: userMessage, response: aiMessage};
    }
    async getMessages(chatId){
        const { docs } = await fbService.getAll(collectionName, {chatId})
        return docs.map(m=>({...m.data(), id: m.id}))
    }
}

const chatService = new ChatService()

module.exports = Object.freeze(chatService)