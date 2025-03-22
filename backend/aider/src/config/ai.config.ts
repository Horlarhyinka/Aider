import dotenv from 'dotenv'

dotenv.config()

const aiConfig = {
    id: process.env.DISAX_AI_ID || "000000",
    username: process.env.DISAX_AI_USERNAME || "Aider Bot",
    avatar: ''
}

export default aiConfig