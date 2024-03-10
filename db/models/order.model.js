import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    orderItem: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product' },
        quantity: Number,
        price: Number
    }],
    totalOrderprice: Number,
    shippingAddress:{
        street:String,
        city:String,
        phone:String
    },
    paymentType:{
        type:String,
        enum:['cash','card'],
        default:'cash'
    },
    isPiad:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date,

}, { timestamps: true })



export const orderModel = mongoose.model('order', schema)
