import express from 'express'
import {validation} from '../../middleware/validation.js'
import { addUser, deleteUser, getSingleUser, getUsers, updateUser } from './controller/user.js'
import { addUserVal, paramsIdVal, updateUserVal } from './user.validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from './../..//middleware/allowedTo.js'
import {checkEmail} from './../../middleware/checkEmail.js'
const userRouter = express.Router()

userRouter
.route('/')
.post(protectedRouter,validation(addUserVal),checkEmail,allowedTo('admin'),addUser)
.get(protectedRouter,allowedTo('admin'),getUsers) 
userRouter
.route('/:id')
.get(protectedRouter,validation(paramsIdVal),allowedTo('admin','user'),getSingleUser)
.delete(protectedRouter,validation(paramsIdVal),allowedTo('admin'),deleteUser)
.put(protectedRouter,validation(updateUserVal),allowedTo('admin','user'),updateUser)



export default userRouter