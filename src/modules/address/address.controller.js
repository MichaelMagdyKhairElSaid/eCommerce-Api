import userModel from "../../../DB/models/user.model.js"
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import deleteOne from "../../utils/handlers/refactor.handler.js"

export const addAddress = asyncHandler(async(req,res,next)=>{
    const {address} = req.body     
    let result = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{addressList:address}},{new:true})
   !result &&  next(new AppError(`review not found`,404))
   result && res.json({message:"Done",result})
})
export const removeAddress = asyncHandler(async(req,res,next)=>{
    const {address} = req.body     
    let result = await userModel.findByIdAndUpdate(req.user._id,{$pull:{addressList:address}},{new:true})
   !result &&  next(new AppError(`review not found`,404))
   result && res.json({message:"Done",result})
})
export const getAllAddress = asyncHandler(async(req,res,next)=>{    
    let result = await userModel.findById(req.user._id)
   !result &&  next(new AppError(`review not found`,404))
   result && res.json({message:"Done",result:result.addressList})
})