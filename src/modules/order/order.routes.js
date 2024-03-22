import express from 'express'
import {validation} from '../../middleware/validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { createCashOrderVal } from './order.validation.js'
import { createCashOrder, createCheckOutSession, getSpcificOrder, getallOrders } from './controller/order.js'
import { isVerify } from '../../middleware/isVerify.js'


const orderRouter = express.Router()

orderRouter
.route('/')
.get(protectedRouter, isVerify,allowedTo('user','admin'),getSpcificOrder)

orderRouter.get('/allOrder',protectedRouter,allowedTo('admin'),getallOrders)
.route('/:id')
.post(protectedRouter, isVerify,allowedTo('user'),validation(createCashOrderVal),createCashOrder)

orderRouter.post('/checkout/:id', isVerify,protectedRouter,allowedTo('user'),validation(createCashOrderVal),createCheckOutSession)


export default orderRouter