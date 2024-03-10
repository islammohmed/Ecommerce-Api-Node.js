import joi from 'joi'
const addBrandValidation = joi.object({
    name: joi.string().min(2).max(20).trim().required(),
    imageCover: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    }).required(),
    createdBy: joi.string().hex().length(24)
})
const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateBrandValidation = joi.object({
    name: joi.string().min(2).max(20).trim(),
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
    }).optional(),
    createdBy: joi.string().hex().length(24)
})
export {
    addBrandValidation,
    paramValidation,
    updateBrandValidation
}