import { cartModel } from '../../../../db/models/cart.model.js'
import { orderModel } from '../../../../db/models/order.model.js'
import { productModel } from '../../../../db/models/product.model.js'
import { userModel } from '../../../../db/models/user.model.js'
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { ApiFeature } from '../../../utils/apiFeatur.js'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OrwJRCWdWW6cS4fLPRZtRX528YSClxGTEZ9YKdLLqGh0vCGeUA0Q6hIbv7Tiilu9regkjDrBi1vObSFG9EFURhx000Taq17zi');

const createCashOrder = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('cart not founded', 404))
    let totalOrderPrice = cart.totalpriceAfterDiscount ? cart.totalpriceAfterDiscount : cart.totalprice
    let order = new orderModel({
        user: req.user._id,
        orderItem: cart.cartItem,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress,
    })
    await order.save()
    let options = cart.cartItem.map((prod) => {
        return ({
            updateOne: {
                "filter": { _id: prod.product },
                "update": { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
            }
        })
    })
    await productModel.bulkWrite(options)
    await cartModel.findOneAndDelete({ user: req.user._id })
    res.send({ msg: 'success', order })
})
const getallOrders = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeature(orderModel.find().populate('orderItem.product'), req.query)
        .pagenation(15).fields().search().sort().filter()
    let order = await apiFeature.mongoseQuery
    if (!order) return next(new AppError('order not founded', 404))
    res.send({ msg: 'success', order })
})
const getSpcificOrder = catchError(async (req, res, next) => {
    let order = await orderModel.findOne({ user: req.user._id }).populate('orderItem.product')
    if (!order) return next(new AppError('order not founded', 404))
    res.send({ msg: 'success', order })
})

const createCheckOutSession = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('cart not founded', 404))
    let totalOrderPrice = cart.totalpriceAfterDiscount ? cart.totalpriceAfterDiscount : cart.totalprice
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://www.linkedin.com/in/islammuhaamed/',
        cancel_url: 'https://www.linkedin.com/in/islammuhaamed/',
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    });
    res.send({ msg: "success", session })
})

const createOnlineOrder = catchError((request, response) => {
    const sig = request.headers['stripe-signature'].toString();

    let event;
    event = stripe.webhooks.constructEvent(request.body, sig, "whsec_5RTQ4zCeaVhRPn65NTzpYxfAZ91FGyuH");
    if (event.type == "checkout.session.completed") {
        card(event.data.object, response)
        console.log("create Order here...");
    } else {
        console.log(`Unhandled event type ${event.type}`);

    }

})

export {
    createCashOrder,
    getallOrders,
    getSpcificOrder,
    createCheckOutSession,
    createOnlineOrder
}


async function card(e, res) {
    try {
        let cart = await cartModel.findById(e.client_reference_id);
        if (!cart) throw new AppError('Cart not found', 404);

        let user = await userModel.findOne({ email: e.customer_email });
        if (!user) throw new AppError('User not found', 404);

        let order = new orderModel({
            user: user._id,
            orderItem: cart.cartItem,
            totalOrderPrice: e.amount_total / 100,
            shippingAddress: e.metadata.shippingAddress,
            paymentType: "card",
            isPaid: true,
            paidAt: Date.now()
        });

        await order.save();

        let options = cart.cartItem.map((prod) => {
            return ({
                updateOne: {
                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
                }
            });
        });

        await productModel.bulkWrite(options);
        await cartModel.findByIdAndDelete(cart._id);

        res.send({ msg: 'success', order });
    } catch (error) {
        console.error('Error processing checkout:', error);
        throw error;
    }
}