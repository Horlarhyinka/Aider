const config = require("../config");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");

class AI {
  constructor() {
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];
    this.getSafetySettings = () => ({ safetySettings });
    this.ai = new GoogleGenerativeAI(config.gemini.apiKey);
    this.prompt =
      "You will be an emergency assistant, AiderX giving users on Aider, an emergency response app, tips on how to handle emergencies as a volunteer or how to report emergencies on Aider and neccessary steps to help mitigate emergencies. USER:";

    this.exec = async function (messages) {
      const model = this.ai.getGenerativeModel({
        model: "gemini-pro",
        ...this.getSafetySettings(),
      });
      const prompt = `${this.prompt} ${messages}. AIDERX: `;
      console.log(prompt)
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const formattedText = text.replace("*", "");
      return formattedText;
    };
  }

  async handleChatResponse(text) {
    const prompt = `${text}`;
    return this.exec(prompt);
  }
}

const aiService = new AI();

module.exports = Object.freeze(aiService);
