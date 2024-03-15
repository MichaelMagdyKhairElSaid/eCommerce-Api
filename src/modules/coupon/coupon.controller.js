import couponModel from "../../../DB/models/coupon.model.js"
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import deleteOne from "../../utils/handlers/refactor.handler.js"
import ApiFeature from "../../utils/ApiFeatures.js"
import QRCode from "qrcode"
export const createCoupon = asyncHandler(async(req,res,next)=>{
    let result = new couponModel(req.body);
    let added  = await result.save()
    res.status(201).json({message:"Done",added})
})

export const getAllCoupons = asyncHandler(async(req,res,next)=>{
    let apiFeature= new ApiFeature(couponModel.find(),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"Done",page:apiFeature.page,result})
})

export const getCouponById = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    let result = await couponModel.findById(id)

   let url = await QRCode.toDataURL(result.code) //newly added 
      
    !result && next(new AppError(`coupon not found`,404))
    result && res.json({message:"Done",result,url})
})

export const updateCoupon = asyncHandler(async(req,res,next)=>{
    const {id} = req.params   
    let result = await couponModel.findByIdAndUpdate(id,req.body,{new:true})
   !result &&  next(new AppError(`coupon not found`,404))
   result && res.json({message:"Done",result})
})
export const deleteCoupon = deleteOne(couponModel)