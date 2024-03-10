import express from 'express'
import { deleteCategory, addCategory, getAllCategory, getSingleCategory, updateCategory } from './controller/category.js'
import { validation } from './../../middleware/validation.js'
import { addCategoryValidation, paramValidation, updateCategoryValidation } from './category.validation.js'
import { uploadsingleFile } from '../../../services/file Uploads/fileUploads.js'
import subCategoryRouter from './../subcategory/subCategory.routes.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
const categoryRouter = express.Router()
categoryRouter.use('/:category/subCategory', subCategoryRouter)
categoryRouter
    .route('/')
    .post(protectedRouter, allowedTo('admin'), uploadsingleFile('imageCover'), validation(addCategoryValidation), addCategory)
    .get(getAllCategory)
categoryRouter
    .route('/:id')
    .get(validation(paramValidation), getSingleCategory)
    .put(protectedRouter, allowedTo('admin'), uploadsingleFile('imageCover'), validation(updateCategoryValidation), updateCategory)
    .delete(protectedRouter, allowedTo('admin'), validation(paramValidation), deleteCategory)
export default categoryRouter