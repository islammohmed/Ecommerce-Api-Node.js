import { categoryModel } from './../../../../db/models/category.model.js'
import slugify from "slugify"
import { catchError } from './../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { ApiFeature } from '../../../utils/apiFeatur.js'
import { cloudinaryConfig } from '../../../utils/cloudinaryConfig.js'

const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let image = await cloudinaryConfig().uploader.upload(req.file.path, {
        folder: 'Ecommerce/category'
    })
    req.body.imageCover = image.url
    let category = new categoryModel(req.body)
    await category.save()
    !category && next(new AppError('invalid data', 404))
    category && res.send({ msg: 'success', category })
})
const getAllCategory = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeature(categoryModel.find(), req.query).fields().pagenation().sort().filter().search('name')
    let category = await apiFeature.mongoseQuery
    !category && next(new AppError('category not found', 404))
    category && res.send({ msg: 'success', page: apiFeature.pageNumber, category })
})

const getSingleCategory = catchError(async (req, res, next) => {
    let category = await categoryModel.findById(req.params.id)
    !category && next(new AppError('category not found', 404))
    category && res.send({ msg: 'success', category })
})
const updateCategory = catchError(async (req, res, next) => {
    let { imageCover } = await categoryModel.findById(req.params.id)
    !imageCover && next(new AppError('category not found', 404))

    if (req.file) {
        let publicId = imageCover.split('/').pop().split('.')[0]
        console.log(publicId);
        await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });

        let image = await cloudinaryConfig().uploader.upload(req.file.path, {
            folder: 'Ecommerce/category'
        })
        req.body.imageCover = image.url
    }

    if (req.body.name) req.body.slug = slugify(req.body.name)
    let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    category && res.send({ msg: 'success', category })
})

const deleteCategory = catchError(async (req, res, next) => {
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    !category && next(new AppError('category not found', 404))
    let publicId = category.imageCover.split('/').pop().split('.')[0]
    await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    })

    category && res.send({ msg: 'success' })
})

export {
    addCategory,
    getAllCategory,
    updateCategory,
    getSingleCategory,
    deleteCategory
}