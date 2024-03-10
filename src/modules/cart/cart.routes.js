import express from 'express'
import { validation } from '../../middleware/validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { addToCartVal, applayCouponVal, paramValidation, updatequantityVal } from './cart.validation.js'
import { addTOCart, applayCoupon, clearUSerCart, getLoggedUSerCart, removeItemFromCart, updatequantity } from './controller/cart.js'


const cartRouter = express.Router()

cartRouter
    .route('/')
    .post(protectedRouter, validation(addToCartVal), allowedTo('user'), addTOCart)
    .get(protectedRouter, allowedTo('user'), getLoggedUSerCart)
    .delete(protectedRouter, allowedTo('user'), clearUSerCart)

cartRouter.post('/applayCoupon', validation(applayCouponVal), protectedRouter, allowedTo('user'), applayCoupon)

cartRouter
    .route('/:id')
    .delete(protectedRouter, validation(paramValidation), allowedTo('user', 'admin'), removeItemFromCart)
    .put(protectedRouter, validation(updatequantityVal), allowedTo('user'), updatequantity)

export default cartRouter