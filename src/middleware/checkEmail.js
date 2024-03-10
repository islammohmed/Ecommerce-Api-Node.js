import { userModel } from "../../db/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "./catchError.js";

export const checkEmail = catchError(async(req,res,next)=>{
    let {email} = req.body
    let checkEmail = await userModel.findOne({email})
    if(checkEmail) return next(new AppError('Email already Exist',409))
    next()
})