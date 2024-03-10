import { userModel } from '../../../../db/models/user.model.js'
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'

const addToWishList = catchError(async (req, res, next) => {
    let wishList = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: req.body.product } }, { new: true }).populate('wishList')
    !wishList && next(new AppError('wishList not found', 404))
    wishList && res.send({ msg: 'success', wishList: wishList.wishList })
})
const removeFromWishList = catchError(async (req, res, next) => {
    let wishList = await userModel.findByIdAndUpdate(req.user._id, { $pull: { wishList: req.params.id } }, { new: true }).populate('wishList')
    !wishList && next(new AppError('wishList not found', 404))
    wishList && res.send({ msg: 'success', wishList: wishList.wishList })
})
const getLoggedWishList = catchError(async (req, res, next) => {
    let { wishList } = await userModel.findById(req.user._id).populate('wishList')
    !wishList && next(new AppError('wishList not found', 404))
    wishList && res.send({ msg: 'success', wishList })
})

export {
    addToWishList,
    removeFromWishList,
    getLoggedWishList
}