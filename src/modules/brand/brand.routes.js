import express from 'express'
import { deleteBrand, addBrand, getAllBrand, getSingleBrand, updateBrand } from './controller/brand.js'
import { validation } from '../../middleware/validation.js'
import { addBrandValidation, paramValidation, updateBrandValidation } from './brand.validation.js'
import { uploadsingleFile } from '../../../services/file Uploads/fileUploads.js'

const brandyRouter = express.Router()

brandyRouter
    .route('/')
    .post(uploadsingleFile('imageCover'), validation(addBrandValidation), addBrand)
    .get(getAllBrand)

brandyRouter
    .route('/:id')
    .get(validation(paramValidation), getSingleBrand)
    .put(uploadsingleFile('imageCover'), validation(updateBrandValidation), updateBrand)
    .delete(validation(paramValidation), deleteBrand)
export default brandyRouter