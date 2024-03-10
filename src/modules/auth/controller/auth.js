
import { userModel } from '../../../../db/models/user.model.js'
import { sendEmail } from '../../../../services/email/sendEmail.js'
import { AppError } from '../../../utils/AppError.js'
import { catchError } from './../../../middleware/catchError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

const signUp = catchError(async (req, res, next) => {
    let Code = nanoid(6);
    req.body.verifyCode = Code
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECERET_KEY)
    sendEmail(Code, req.body.email)
    !user && next(new AppError('invalid data', 404))
    user && res.send({ msg: 'success', token })
})

const signIn = catchError(async (req, res, next) => {
    let { email, password } = req.body
    let checkEmail = await userModel.findOne({ email })
    if (!checkEmail) return next(new AppError('emial Not Founded'))
    else {
        let checkPassword = bcrypt.compareSync(password, checkEmail.password)
        if (!checkPassword) return next(new AppError('passwor incorrect', 401))
        let token = jwt.sign({ userId: checkEmail._id, role: checkEmail.role }, process.env.SECERET_KEY)
        res.send({ msg: "success", token })
    }
})
const protectedRouter = catchError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) return next(new AppError('invalid Token', 401))
    let decoded = jwt.verify(token, process.env.SECERET_KEY)
    if (!decoded) return next(new AppError('invalid decoded', 401))
    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError('user not founded login again', 404))
    if (user.passwordChangedAt) {
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if (time > decoded.iat) return next(new AppError('invalid token log in again', 401))
    }
    req.user = user
    next()
})
const changePassword = catchError(async (req, res, next) => {
    let { oldPassword, newPassword } = req.body
    if (bcrypt.compareSync(oldPassword, req.user.password)) {
        await userModel.findByIdAndUpdate(req.user._id, { password: newPassword, passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.SECERET_KEY)
        return res.send({ msg: 'success', token })
    }

})
const isVerify = catchError(async (req, res, next) => {
    let verify = await userModel.findOne({ _id: req.user._id, verifyCode: req.body.code })
    if (!verify) return next(new AppError('code invalid', 401))
    let verified = await userModel.findOneAndUpdate({ _id: req.user._id }, { isverify: true },)
    if (!verified) return next(new AppError('verify faild', 401))
    res.send({ msg: 'success' })
})
const forgetPassword = catchError(async (req, res, next) => {
    let { email } = req.body
    let user = await userModel.findOne({ email })
    if (!user) return next(new AppError('no account for this email', 401))
    let resetCode = nanoid(6)
    await userModel.findOneAndUpdate({ email }, { resetCode })
    sendEmail(resetCode, email)
    res.send({ msg: 'success' })
})
const checkCode = catchError(async (req, res, next) => {
    let { email, code } = req.body
    let verify = await userModel.findOne({ email: email, resetCode: code })
    if (!verify) return next(new AppError('code invalid', 401))
    res.send({ msg: 'success' })
})
const resetPassword = catchError(async (req, res, next) => {
    let user = await userModel.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChangedAt: Date.now() })
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECERET_KEY)
    res.send({ msg: 'success', token })
})



export {
    signUp,
    protectedRouter,
    signIn,
    changePassword,
    isVerify,
    forgetPassword,
    checkCode,
    resetPassword
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVjN2ZlMTBhOWE3ZGM5NWZhNjFmNzAiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTk5ODU0MX0.onru-Ip1uJF3qTvkTxagLGI3k9c-yXyQdKwnMPuF15c
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVjODIzZjExOGU1NmRlNTY5YzVmYzEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTk5ODY1NX0.Xdq1DaIeTMLKeehcjYFWGLUDu8OazR6WxpP4RF7DPLM