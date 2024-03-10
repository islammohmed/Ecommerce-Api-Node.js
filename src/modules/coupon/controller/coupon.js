import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { ApiFeature } from '../../../utils/apiFeatur.js'
import { couponModel } from './../../../../db/models/coupon.model.js'
import { deleteOne } from './../../../../src/modules/handlers/handel.js'
const addCoupon = catchError(async (req, res, next) => {
    let isCouponExist = await couponModel.findOne({ code: req.body.code })
    console.log(isCouponExist);
    if (isCouponExist) return next(new AppError('you are created Coupon before', 409))
    let Coupon = new couponModel(req.body)
    await Coupon.save()
    !Coupon && next(new AppError('invalid data', 404))
    Coupon && res.send({ msg: 'success', Coupon })
})


const getAllCoupon = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeature(couponModel.find({}), req.query).fields().pagenation().sort().filter().search()
    let coupon = await apiFeature.mongoseQuery
    !coupon && next(new AppError('coupon not found', 404))
    coupon && res.send({ msg: 'success', page: apiFeature.pageNumber, coupon })
})

const getSingleCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findById(req.params.id)
    !coupon && next(new AppError('coupon not found', 404))
    coupon && res.send({ msg: 'success', coupon })
})
const updateCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !coupon && next(new AppError('coupon not found', 404))
    coupon && res.send({ msg: 'success', coupon })
})
const deleteCoupon = deleteOne(couponModel)

export {
    addCoupon,
    getAllCoupon,
    updateCoupon,
    getSingleCoupon,
    deleteCoupon
}