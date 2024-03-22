import express from 'express'
import { validation } from '../../middleware/validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { addAddressVal, paramValidation } from './address.validation.js'
import { addAddress, getLoggedAddress, removeAddress } from './controller/address.js'
import { isVerify } from '../../middleware/isVerify.js'

const addressRouter = express.Router()

addressRouter
    .route('/')
    .patch(protectedRouter, isVerify, validation(addAddressVal), allowedTo('user'), addAddress)
    .get(protectedRouter, isVerify, allowedTo('user'), getLoggedAddress)

addressRouter
    .route('/:id')
    .delete(protectedRouter,  isVerify,validation(paramValidation), allowedTo('user'), removeAddress)


export default addressRouter