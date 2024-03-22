import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addReviewValidation, paramValidation, updateReviewValidation } from './review.validation.js'
import { addReview, deleteReview, getAllreview, getSinglereview, updateReview } from './controller/review.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { isVerify } from '../../middleware/isVerify.js'

const reviewRouter = express.Router()

reviewRouter
    .route('/')
    .post(protectedRouter, isVerify, validation(addReviewValidation), allowedTo('user'), addReview)
    .get(getAllreview)


reviewRouter.route('/:id')
    .get(getSinglereview)
    .put(protectedRouter,  isVerify,validation(updateReviewValidation), allowedTo('user'), updateReview)
    .delete(protectedRouter,  isVerify,validation(paramValidation), allowedTo('user', 'admin'), deleteReview)


export default reviewRouter