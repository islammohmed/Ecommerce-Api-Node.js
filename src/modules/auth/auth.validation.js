import Joi from 'joi'





const signUpValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-z][a-z0-9@#]{8,40}$/).required(),
    rePassword:Joi.valid(Joi.ref('password')).required(), 
})
const signInValidation = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})

const changePasswordVal = Joi.object({
    oldPassword:Joi.string().pattern(/^[A-z][a-z0-9@#]{8,40}$/).required(),
    newPassword : Joi.string().pattern(/^[A-z][a-z0-9@#]{8,40}$/).required(),
    reNewPassword:Joi.valid(Joi.ref('newPassword')).required()
})

const isverifyVal = Joi.object({
    code:Joi.string().required()
})

const forgetPasswordVal = Joi.object({
    email:Joi.string().email().required()
})
const checkCodeVal = Joi.object({
    code:Joi.string().required(),
    email:Joi.string().email().required()
})

const resetPasswordVal = Joi.object({
    email:Joi.string().email().required(),
    newPassword: Joi.string().pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/).required(),
    reNewPassword: Joi.valid(Joi.ref('newPassword')).required()
})
export{
    signUpValidation,
    signInValidation,
    changePasswordVal,
    isverifyVal,
    checkCodeVal,
    forgetPasswordVal,
    resetPasswordVal
}