
import slugify from "slugify"
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { productModel } from "../../../../db/models/product.model.js"
import { ApiFeature } from "../../../utils/apiFeatur.js"
import { cloudinaryConfig } from "../../../utils/cloudinaryConfig.js"

const addProduct = catchError(async (req, res, next) => {
    const coverImageResult = await cloudinaryConfig().uploader.upload(req.files.imageCover[0].path, {
        folder: 'Ecommerce/product/coverimage',
    });
    const uploadPromises = req.files.images.map(async (file) => {
        const result = await cloudinaryConfig().uploader.upload(file.path, {
            folder: 'Ecommerce/product/images',
        });
        return result.url;
    });
    const images = await Promise.all(uploadPromises);
    req.body.imageCover = coverImageResult.url;
    req.body.images = images;
    req.body.slug = slugify(req.body.title)
    let product = new productModel(req.body);
    await product.save();

    if (!product) {
        return next(new AppError('Invalid data', 404));
    }

    res.status(200).json({ msg: 'success', product });

});
const getAllProduct = catchError(async (req, res, next) => {
    let apiFeaturee = new ApiFeature(productModel.find().populate('myReviews'), req.query).fields().pagenation().sort().filter().search('title', 'description')
    let product = await apiFeaturee.mongoseQuery
    !product && next(new AppError('Product not found', 404))
    product && res.send({ msg: 'success', page: apiFeaturee.pageNumber, product })
})

const getSingleProduct = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id).populate('myReviews')
    !product && next(new AppError('Product not found', 404))
    product && res.send({ msg: 'success', product })
})
const updateProduct = async (req, res, next) => {
    let product = await productModel.findById(req.params.id)
    if (req.body.title) req.body.slug = slugify(req.body.title)
    if (req.file) {
        let publicId = product.imageCover.split('/').pop().split('.')[0]
        await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });

        let image = await cloudinaryConfig().uploader.upload(req.file.path, {
            folder: 'Ecommerce/product'
        })
        req.body.imageCover = image.url
    }
    let updatedproduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !updatedproduct && next(new AppError('faild to update', 404))
    updatedproduct && res.send({ msg: 'success', updatedproduct })
}
const deleteProduct = catchError(async (req, res, next) => {
    const product = await productModel.findByIdAndDelete(req.params.id)
    let publicId = product.imageCover.split('/').pop().split('.')[0]
    await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
    !product && next(new AppError('Product not found', 404))
    product && res.send({ msg: 'success' })
})

export {
    addProduct,
    getAllProduct,
    updateProduct,
    getSingleProduct,
    deleteProduct
}