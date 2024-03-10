
import joi from 'joi'

const addWishListVal = joi.object({
    product: joi.string().hex().length(24).required()
})
const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateWishListVal = joi.object({
    product: joi.string().hex().length(24).required()
})
export {
    addWishListVal,
    paramValidation,
    updateWishListVal
}