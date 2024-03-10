
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    discount:{
        type:Number,
        min: 0,
        required:true
    },
    expire:{
        type: Date,
        required:true
    },
    code:{
        type:String,
        trim:true,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{ timestamps: true })

export const couponModel = mongoose.model('coupon',schema)
