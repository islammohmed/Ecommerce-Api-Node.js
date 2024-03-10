import joi from 'joi'

const addCategoryValidation = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    imageCover: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    }).required()
})

const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateCategoryValidation = joi.object({
    name: joi.string().min(2).max(100).trim(),
    id: joi.string().hex().length(24).required(),
    imageCover: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jepg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880)
    }).required()
})
export {
    addCategoryValidation,
    paramValidation,
    updateCategoryValidation
}