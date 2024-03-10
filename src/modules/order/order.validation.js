
import Joi from 'joi'
import joi from 'joi'
const createCashOrderVal = joi.object({
        id: joi.string().hex().length(24).required(),
        shippingAddress:Joi.object({
            street:joi.string().trim().required(),
            city:joi.string().trim().required(),
            phone:joi.string().trim().required()
        }).required(),
})


export {
    createCashOrderVal,

}