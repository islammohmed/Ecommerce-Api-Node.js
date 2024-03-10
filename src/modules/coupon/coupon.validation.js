import joi from 'joi'
const addCouponValidation = joi.object({
    code: joi.string().min(1).max(200).trim().required(),
    discount: joi.number().min(1).required(),
    expire: joi.date().required()
})
const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateCouponValidation = joi.object({
    id: joi.string().hex().length(24).required(),
    code: joi.string().min(1).max(200).trim().optional(),
    discount: joi.number().min(1).optional(),
    expire: joi.date().optional()
})
export {
    addCouponValidation,
    paramValidation,
    updateCouponValidation
}