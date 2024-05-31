const Joi = require("joi")

class Validator{
   validatePost(obj){
    return Joi.object({
        userId: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.string()
    }).validate(obj)
    } 

    // validateGetByIdObj(obj){
    //     return Joi.object({
    //         id: Joi.string().required()
    //     }).validate(obj)
    // }
    

}

const validator = new Validator()

module.exports = validator
    