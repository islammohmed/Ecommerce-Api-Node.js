import { brandModel } from './../../../../db/models/brand.model.js'
import slugify from "slugify"
import { catchError } from './../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { deleteOne } from '../../handlers/handel.js'
import { ApiFeature } from '../../../utils/apiFeatur.js'
import { cloudinaryConfig } from '../../../utils/cloudinaryConfig.js'

const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let image = await cloudinaryConfig().uploader.upload(req.file.path, {
        folder: 'Ecommerce/brands'
    })
    req.body.imageCover = image.url
    let brand = new brandModel(req.body)
    await brand.save()
    !brand && next(new AppError('invalid data', 404))
    brand && res.send({ msg: 'success', brand })
})
const getAllBrand = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeature(brandModel.find(), req.query).fields().pagenation(15).sort().filter().search()
    let brand = await apiFeature.mongoseQuery
    !brand && next(new AppError('Brand not found', 404))
    brand && res.send({ msg: 'success', page: apiFeature.pageNumber, brand })
})

const getSingleBrand = catchError(async (req, res, next) => {
    let brand = await brandModel.findById(req.params.id)
    !brand && next(new AppError('Brand not found', 404))
    brand && res.send({ msg: 'success', brand })
})
const updateBrand = catchError(async (req, res, next) => {
    let updatePhoto = await brandModel.findById(req.params.id)
    if (!updatePhoto) return next(new AppError('photo not founded'))
    if (req.file) {
        let publicId = updatePhoto.imageCover.split('/').pop().split('.')[0]
        console.log(publicId);
        await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });

        let image = await cloudinaryConfig().uploader.upload(req.file.path, {
            folder: 'Ecommerce/brands'
        })
        req.body.imageCover = image.url
    }
    if (req.body.name) req.body.slug = slugify(req.body.name)
    let brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !brand && next(new AppError('Brand not found', 404))
    brand && res.send({ msg: 'success', brand })
})
const deleteBrand = deleteOne(brandModel)

export {
    addBrand,
    getAllBrand,
    updateBrand,
    getSingleBrand,
    deleteBrand
}