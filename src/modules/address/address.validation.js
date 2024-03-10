
import joi from 'joi'

const addAddressVal = joi.object({
    streat: joi.string().min(3).max(20).required(),
    phone: joi.string().required(),
    city: joi.string().required(),
})
const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateAddressVal = joi.object({
    streat: joi.string().min(3).max(20).optional(),
    phone: joi.string().optional(),
    city: joi.string().optional(),
})
export {
    addAddressVal,
    paramValidation,
    updateAddressVal
}