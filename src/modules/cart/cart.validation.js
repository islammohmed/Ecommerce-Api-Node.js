
import joi from 'joi'
const addToCartVal = joi.object({
    product: joi.string().hex().length(24).required(),
    quantity: joi.number().integer().optional({ convert: false }).required(),
    price: joi.number(),
})
const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updatequantityVal = joi.object({
    id: joi.string().hex().length(24).required(),
    quantity: joi.number().integer().optional({ convert: false }).required()
})
const applayCouponVal = joi.object({
    code: joi.string().min(1).max(200).trim().required()
})

export {
    addToCartVal,
    paramValidation,
    updatequantityVal,
    applayCouponVal
}