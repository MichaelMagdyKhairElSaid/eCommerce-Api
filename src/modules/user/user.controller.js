
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import deleteOne from "../../utils/handlers/refactor.handler.js"
import ApiFeature from "../../utils/ApiFeatures.js"
import userModel from "../../../DB/models/user.model.js"

export const  createUser = asyncHandler(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user)return next(new AppError("duplicated email",409))
    let result = new userModel(req.body)
    let added  = await result.save()
    res.status(201).json({message:"Done",added})
})

export const getAllUsers = asyncHandler(async(req,res,next)=>{
    let apiFeature= new ApiFeature(userModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"Done",page:apiFeature.page,result})
})

export const getUserById = asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    let result = await userModel.findById(id)
    !result && next(new AppError(`category not found`,404))
    result && res.json({message:"Done",result})
})

export const updateUser = asyncHandler(async(req,res,next)=>{ 
    const {id} = req.params
    if(req.file)req.body.logo = req.file.filename
    let result = await userModel.findOneAndUpdate({_id:id},req.body,{new:true})
   !result &&  next(new AppError(`category not found`,404))
   result && res.json({message:"Done",result})
})

export const deleteUser = deleteOne(userModel)

export const ChangePassword = asyncHandler(async(req,res,next)=>{ 
    const {id} = req.params
    req.body.changePassAt = Date.now()
    let result = await userModel.findOneAndUpdate({_id:id},req.body,{new:true})
   !result &&  next(new AppError(`category not found`,404))
   result && res.json({message:"Done",result})
})