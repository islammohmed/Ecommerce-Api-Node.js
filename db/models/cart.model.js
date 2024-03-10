import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItem: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product' },
        quantity: {
            type:Number,
            default:1
        },
        price: Number
    }],
    totalprice: Number,
    totalpriceAfterDiscount: Number,
    discount: Number
}, { timestamps: true })



export const cartModel = mongoose.model('cart', schema)
