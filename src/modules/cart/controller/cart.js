import { productModel } from '../../../../db/models/product.model.js'
import { cartModel } from '../../../../db/models/cart.model.js'
import { couponModel } from './../../../../db/models/coupon.model.js'
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'

const calcTotalPrice = (cart) => {
    let totalPrice = 0
    cart.cartItem.forEach((item) => {
        totalPrice += item.quantity * item.price
    })
    cart.totalprice = totalPrice
}
const addTOCart = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new AppError('product not founded'))
    if (req.body.quantity > product.quantity) return next(new AppError('sold out'))
    req.body.price = product.price
    let isCartExist = await cartModel.findOne({ user: req.user._id })
    if (!isCartExist) {
        let cart = new cartModel({
            user: req.user._id,
            cartItem: [req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        !cart && next(new AppError('cart not found', 404))
        cart && res.send({ msg: 'success', cart })
    } else {
        let item = isCartExist.cartItem.find((item) => item.product == req.body.product)
        if (item) {
            let rest = Math.abs(item.quantity - product.quantity)

            if (item.quantity + req.body.quantity > product.quantity) return next(new AppError(`sorry only available ${rest}`))
            item.quantity += req.body.quantity || 1
        }
        else isCartExist.cartItem.push(req.body)
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({ message: "success", cart: isCartExist })
    }
})
const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItem: { _id: req.params.id } } }, { new: true })
    calcTotalPrice(cart)
    await cart.save()
    !cart && next(new AppError('item not found', 404))
    cart && res.send({ msg: 'success', cart })
})
const updatequantity = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id })
    !cart && next(new AppError('cart not found', 404))
    let item = cart.cartItem.find(item => item._id == req.params.id)
    !item && next(new AppError('item not found', 404))
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    cart && res.send({ msg: 'success', cart })
})
const getLoggedUSerCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id }).populate('cartItem.product')
    !cart && next(new AppError('cart not found', 404))
    cart && res.send({ msg: 'success', cart })
})
const clearUSerCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndDelete({ user: req.user._id }).populate('cartItem.product')
    !cart && next(new AppError('cart not found', 404))
    cart && res.send({ msg: 'success', cart })
})
const applayCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.code, expire: { $gte: Date.now() } })
    if (!coupon) return next(new AppError('invalid coupon'))
    let cart = await cartModel.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('cart not founded'))
    let totalpriceAfterDiscount = cart.totalprice - (cart.totalprice * coupon.discount) / 100
    cart.totalpriceAfterDiscount = totalpriceAfterDiscount
    await cart.save()
    res.send({ msg: "success", cart })
})



export {
    addTOCart,
    removeItemFromCart,
    updatequantity,
    getLoggedUSerCart,
    clearUSerCart,
    applayCoupon
}