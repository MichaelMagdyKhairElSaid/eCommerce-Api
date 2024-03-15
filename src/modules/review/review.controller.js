import reviewModel from "../../../DB/models/review.model.js"
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import deleteOne from "../../utils/handlers/refactor.handler.js"
import ApiFeature from "../../utils/ApiFeatures.js"

export const createReview = asyncHandler(async(req,res,next)=>{
    req.body.user =req.user._id;
    let isReview = await reviewModel.findOne({user:req.user._id,product:req.body.product})
    if (isReview) return next(new AppError("already have review",409)) 
    let result = new reviewModel(req.body);
    let added  = await result.save()
    res.status(201).json({message:"Done",added})
})

export const getAllReviews = asyncHandler(async(req,res,next)=>{
    let apiFeature= new ApiFeature(reviewModel.find(),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery.populate("user","name")
    res.json({message:"Done",page:apiFeature.page,result})
})

export const getReviewById = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    let result = await reviewModel.findById(id)
    !result && next(new AppError(`review not found`,404))
    result && res.json({message:"Done",result})
})

export const updateReview = asyncHandler(async(req,res,next)=>{
    const {id} = req.params   
    let result = await reviewModel.findOneAndUpdate({_id:id,user:req.user._id},req.body,{new:true})
   !result &&  next(new AppError(`review not found`,404))
   result && res.json({message:"Done",result})
})
export const deleteReview = deleteOne(reviewModel)