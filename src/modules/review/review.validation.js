
import joi from 'joi'



const addReviewValidation = joi.object({
    text: joi.string().min(3).max(200).trim().required(),
    product: joi.string().hex().length(24).required(),
    rate: joi.number().min(1).max(5).required()
})
const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateReviewValidation = joi.object({
    id: joi.string().hex().length(24).optional(),
    text: joi.string().min(3).max(200).trim().optional(),
    product: joi.string().hex().length(24).optional(),
    rate: joi.number().min(1).max(5).optional()
})
export {
    addReviewValidation,
    paramValidation,
    updateReviewValidation
}