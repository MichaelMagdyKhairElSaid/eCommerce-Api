import userModel from "../../../DB/models/user.model.js"
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import deleteOne from "../../utils/handlers/refactor.handler.js"

export const addToWishList = asyncHandler(async(req,res,next)=>{
    const {productId} = req.params     
    let result = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:productId}},{new:true})
   !result &&  next(new AppError(`product not found`,404))  
   result && res.json({message:"Done",result})
})
export const removeFromWishList = asyncHandler(async(req,res,next)=>{
    const {productId} = req.params     
    let result = await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishList:productId}},{new:true})
   !result &&  next(new AppError(`product not found`,404))
   result && res.json({message:"Done",result})
})
export const getAllWishList = asyncHandler(async(req,res,next)=>{
    const {productId} = req.params     
    let result = await userModel.findById(req.user._id)
   !result &&  next(new AppError(`product not found`,404))
   result && res.json({message:"Done",result:result.wishList})
})

export const deleteReview = deleteOne(userModel)