import express from 'express'
import { deleteSubCategory, addSubCategory, getAllSubCategory, getSingleSubCategory, updateSubCategory } from './controller/subCategory.js'
import {validation} from './../../middleware/validation.js'
import {addSubCategoryValidation, paramValidation, updateSubCategoryValidation} from './subCategory.validation.js'
import { uploadsingleFile } from '../../../services/file Uploads/fileUploads.js'
import {protectedRouter} from './../auth/controller/auth.js'
import allowedTo from './../../middleware/allowedTo.js'
const subCategoryRouter = express.Router({mergeParams:true})

subCategoryRouter
.route('/')
.post(protectedRouter,allowedTo('admin'),uploadsingleFile('img'),validation(addSubCategoryValidation),addSubCategory)
.get(getAllSubCategory)

subCategoryRouter
.route('/:id')
.get(validation(paramValidation),getSingleSubCategory)
.put(protectedRouter,allowedTo('admin'),validation(updateSubCategoryValidation),updateSubCategory)
.delete(protectedRouter,allowedTo('admin'),validation(paramValidation),deleteSubCategory)
export default subCategoryRouter