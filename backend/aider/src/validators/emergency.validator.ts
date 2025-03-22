import Joi from "joi"


class Validator{
    validateEmergencyPayload(obj: object){
        return Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            coord: Joi.object({ lng: Joi.number().min(0).required(), lat: Joi.number().min(0).required()}).required(),
            audio: Joi.string().optional(),
            image: Joi.string().optional(),
            address: Joi.string(),

        }).validate(obj)
    }

    validateRespondToEmergencyPayload(obj: object){
        return Joi.object({
            coord: Joi.object({ lng: Joi.number().min(0), lat: Joi.number().min(0)}),
        }).validate(obj)
    }


    validateCancelEmergencyPayload(obj: object){
        return Joi.object({
            remark: Joi.string().required()
        }).validate(obj)
    }

    validatePostMessagePayload(obj: object){
        return Joi.object({
            name: Joi.string().required(),
            text: Joi.string().required(),
            avatar: Joi.string(),
            images: Joi.array(),
            userId: Joi.string().required(),
        }).validate(obj)
    }
}

export const emergencyValidator = new Validator()