
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SafetySetting} from "@google/generative-ai"
import { cleanText } from "../utils/cleaners"
import * as config from '../config/config'




class AI{
    getSafetySettings
    model
    constructor(){
        const safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },{
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            }
          ];
        this.getSafetySettings = () =>({safetySettings})
        const ai = new GoogleGenerativeAI(config.googleAiConfig.apiKey!)
        this.model = ai.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
        
    }

    private async exec(prompt: string, imageUrl?: string){
        let imageBuff;
        if(imageUrl){
            const imageRBuff = await fetch(imageUrl).then((response) => response.arrayBuffer());
            console.log('image present...', {imageBuff})
        }
        const res = await this.model.generateContent(imageBuff? [
            {
                inlineData: { data: Buffer.from(imageBuff).toString('base64'), mimeType: 'image/jpeg'}
            }
        ]: prompt)
        return res.response.text()
    }

    async queryModel (prompt: string, imageUrl?: string){
        const res = await this.exec(prompt, imageUrl)
        return cleanText(res)
    }

}

const aiService = new AI()

export default Object.freeze(aiService)