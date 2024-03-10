
import joi from 'joi'



const addProductValidation = joi.object({
    title: joi.string().min(2).max(100).trim().required(),
    imageCover: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).required(),
    images: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).required(),
    description: joi.string().min(10).max(500).trim().required(),
    price: joi.number().min(0).required(),
    priceAfterDiscount: joi.number().min(0),
    brand: joi.string().hex().length(24).required(),
    stock: joi.number().min(0).required(),
    category: joi.string().hex().length(24).required(),
    subCategory: joi.string().hex().length(24).required(),
    createdBy: joi.string().hex().length(24).optional(),
    brand: joi.string().hex().length(24).optional(),
    quantity: joi.number().integer().required()
})

const paramValidation = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateProductValidation = joi.object({
    id: joi.string().hex().length(24).required(),
    title: joi.string().min(2).max(100).trim().optional(),
    imageCover: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).optional(),
    description: joi.string().min(10).max(500).trim().optional(),
    price: joi.number().min(0).optional(),
    priceAfterDiscount: joi.number().min(0),
    brand: joi.string().hex().length(24).optional(),
    stock: joi.number().min(0).optional(),
    category: joi.string().hex().length(24).optional(),
    subCategory: joi.string().hex().length(24).optional(),
    createdBy: joi.string().hex().length(24).optional(),
    brand: joi.string().hex().length(24).optional(),
    quantity: joi.number().integer().optional()

})
export {
    addProductValidation,
    paramValidation,
    updateProductValidation
}