import Joi, { string } from "joi"

class Validator{
    validateRegisterPayload(obj: object){
        return Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            tel: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            skill: Joi.string(),
            about: Joi.string()
        }).validate(obj)
    }

    validateLoginPayload(obj: object){
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }).validate(obj)
    }

}

export const userValidator =  new Validator()