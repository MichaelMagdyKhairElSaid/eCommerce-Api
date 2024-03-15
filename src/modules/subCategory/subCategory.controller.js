import subCategoryModel from "../../../DB/models/subCategory.model.js"
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js" 
import slugify from "slugify"
import deleteOne from "../../utils/handlers/refactor.handler.js"
import ApiFeature from "../../utils/ApiFeatures.js"

export const createSubCategory = asyncHandler(async(req,res,next)=>{
    const {name,categoryId} = req.body
    let result = new subCategoryModel({name,slug:slugify(name),category:categoryId})
    let added  = await result.save()
    res.status(201).json({message:"Done",added})
})

export const getAllSubCategories = asyncHandler(async(req,res,next)=>{
    let filter = {}
    if(req.params && req.params.id){
        filter = {category:req.params.id}
    }
    let apiFeature= new ApiFeature(subCategoryModel.find(filter),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"Done",page:apiFeature.page,result})
})

export const getSubCategoryById = asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    let result = await subCategoryModel.findById(id)
    !result && next(new AppError(`subCategory not found`,404))
    result && res.json({message:"Done",result})
})

export const updateSubCategory = asyncHandler(async(req,res,next)=>{
    const {name,categoryId} = req.body
    const {id} = req.params
    let result = await subCategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name),category:categoryId},{new:true})
   !result &&  next(new AppError(`subCategory not found`,404))
   result && res.json({message:"Done",result})
})
export const deleteSubCategory = deleteOne(subCategoryModel)