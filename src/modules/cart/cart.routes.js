import express from 'express'
import { validation } from '../../middleware/validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { addToCartVal, applayCouponVal, paramValidation, updatequantityVal } from './cart.validation.js'
import { addTOCart, applayCoupon, clearUSerCart, getLoggedUSerCart, removeItemFromCart, updatequantity } from './controller/cart.js'
import { isVerify } from '../../middleware/isVerify.js'


const cartRouter = express.Router()

cartRouter
    .route('/')
    .post(protectedRouter,  isVerify,validation(addToCartVal), allowedTo('user'), addTOCart)
    .get(protectedRouter,  isVerify,allowedTo('user'), getLoggedUSerCart)
    .delete(protectedRouter, isVerify, allowedTo('user'), clearUSerCart)

cartRouter.post('/applayCoupon', isVerify, validation(applayCouponVal), protectedRouter, allowedTo('user'), applayCoupon)

cartRouter
    .route('/:id')
    .delete(protectedRouter, isVerify, validation(paramValidation), allowedTo('user', 'admin'), removeItemFromCart)
    .put(protectedRouter,  isVerify,validation(updatequantityVal), allowedTo('user'), updatequantity)

export default cartRouter