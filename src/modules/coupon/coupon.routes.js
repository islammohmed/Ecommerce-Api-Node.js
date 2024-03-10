import express from 'express'
import { validation } from '../../middleware/validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { addCoupon, deleteCoupon, getAllCoupon, getSingleCoupon, updateCoupon } from './controller/coupon.js'
import { addCouponValidation, paramValidation, updateCouponValidation } from './coupon.validation.js'

const couponRouter = express.Router()
couponRouter.use(protectedRouter, allowedTo('admin'))
couponRouter
    .route('/')
    .post(validation(addCouponValidation), addCoupon)
    .get(getAllCoupon)

couponRouter.route('/:id')
    .get(validation(paramValidation), getSingleCoupon)
    .put(validation(updateCouponValidation), updateCoupon)
    .delete(validation(paramValidation), deleteCoupon)
export default couponRouter