import express from 'express'
import { deleteProduct, addProduct, getAllProduct, getSingleProduct, updateProduct } from './controller/product.js'
import { validation } from '../../middleware/validation.js'
import { addProductValidation, paramValidation, updateProductValidation } from './product.validation.js'
import { uploadFields } from '../../../services/file Uploads/fileUploads.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'

const productRouter = express.Router()

productRouter
    .route('/')
    .post(protectedRouter, allowedTo('admin'), uploadFields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ]), validation(addProductValidation), addProduct)
    .get(getAllProduct)

productRouter
    .route('/:id')
    .get(validation(paramValidation), getSingleProduct)
    .put(protectedRouter, allowedTo('admin'), uploadFields([
        { name: 'imageCover', maxCount: 1 }
    ]), validation(updateProductValidation), updateProduct)
    .delete(protectedRouter, allowedTo('admin'), validation(paramValidation), deleteProduct)
export default productRouter