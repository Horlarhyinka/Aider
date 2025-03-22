import Joi, { string } from "joi"

class Validator{
    validateRegisterPayload(obj: object){
        return Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            tel: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            skill: Joi.string().required(),
            about: Joi.string(),
            deviceToken: Joi.string(),
            experience: Joi.number().required().default(0),
        }).validate(obj)
    }

    validateLoginPayload(obj: object){
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
            deviceToken: Joi.string()
        }).validate(obj)
    }
}

export const userValidator =  new Validator()