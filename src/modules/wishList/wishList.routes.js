import express from 'express'
import { validation } from '../../middleware/validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { addWishListVal, paramValidation } from './wishList.validation.js'
import { addToWishList, getLoggedWishList, removeFromWishList } from './controller/wishList.js'

const wishListRouter = express.Router()

wishListRouter
    .route('/')
    .patch(protectedRouter, validation(addWishListVal), allowedTo('user'), addToWishList)
    .get(protectedRouter, allowedTo('user'), getLoggedWishList)


wishListRouter
    .route('/:id')
    .delete(protectedRouter, allowedTo('user'), validation(paramValidation), removeFromWishList)

export default wishListRouter