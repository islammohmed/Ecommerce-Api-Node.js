import joi from 'joi'

const addSubCategoryValidation = joi.object({
    name: joi.string().min(2).max(200).trim().required(),
    category: joi.string().hex().length(24).required(),
    createdBy: joi.string().hex().length(24)
})

const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateSubCategoryValidation = joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(2).max(200).trim(),
    category: joi.string().hex().length(24),
    createdBy: joi.string().hex().length(24)
})
export {
    addSubCategoryValidation,
    paramValidation,
    updateSubCategoryValidation
}