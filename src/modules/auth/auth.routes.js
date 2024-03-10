import express from 'express'
import { validation } from './../../../src/middleware/validation.js'
import { changePasswordVal, checkCodeVal, forgetPasswordVal, isverifyVal, resetPasswordVal, signInValidation, signUpValidation } from './auth.validation.js'
import { changePassword, checkCode, forgetPassword, isVerify, resetPassword, signIn, signUp } from './controller/auth.js'
import { checkEmail } from '../../middleware/checkEmail.js'
import { protectedRouter } from './controller/auth.js'
const authRouter = express.Router()

authRouter.post('/signUp', validation(signUpValidation), checkEmail, signUp)
authRouter.post('/signIn', validation(signInValidation), signIn)
authRouter.patch('/changedPassword', protectedRouter, validation(changePasswordVal), changePassword)
authRouter.post('/verification', protectedRouter, validation(isverifyVal), isVerify)
authRouter.post('/forgetPassword', validation(forgetPasswordVal), forgetPassword)
authRouter.post('/checkCode', validation(checkCodeVal), checkCode)
authRouter.post('/resetPassword', validation(resetPasswordVal), resetPassword)

export default authRouter