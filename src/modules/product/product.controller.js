import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import slugify from "slugify"
import deleteOne from "../../utils/handlers/refactor.handler.js"
import productModel from "../../../DB/models/product.model.js"
import ApiFeature from "../../utils/ApiFeatures.js"
import path from "path"

import fs from "fs"
import {promisify} from "util"

const unlinkAsync = promisify(fs.unlink)

export const createProduct = asyncHandler(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.imageCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map((ele)=>ele.filename)
    let result = new productModel(req.body)
    let added  = await result.save()
    res.status(201).json({message:"Done",added})
})

export const getAllProducts = asyncHandler(async(req,res,next)=>{
let apiFeature= new ApiFeature(productModel.find(),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"Done",page:apiFeature.page,result})
})

export const getProductById = asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    let result = await productModel.findById(id)
    !result && next(new AppError(`product not found`,404))
    result && res.json({message:"Done",result})
})

export const updateProduct = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    let foundedProduct = await productModel.findById(id)
    console.log( req.files);
    if (req.files) {
        console.log(req.body.imgCover);
       if( req.files.imgCover[0]){ 
           //TODO : remove images from storage
           console.log(foundedProduct.imageCover);
            // await unlinkAsync(`./upload/product/${foundedProduct.imageCover}`)   
            try {
                console.log("=========path:"+path.join(`${path.resolve()}/upload/product/${foundedProduct.imageCover}`));

               fs.unlinkSync(path.join(`${path.resolve()}/upload/product/${foundedProduct.imageCover}`)) //delete from local storage
                 

            } catch (error) {
                console.log("error",error);
            }
            //delete images on cloudinary

        /*   if (req.files) {
                        await cloudinary.uploader.destroy(product.image.public_id)
                        const {secure_url,public_id} = cloudinary.uploader.upload(req.file,{
                            folder:`eCommerce/product/${product.customId}`
                        })
                        product.image = {secure_url,public_id} 
              }   */    
            
           req.body.imageCover = req.files.imgCover[0].filename
        }
        req.body.images = req.files.images.map((ele)=>ele.filename)
    }
    if(req.body.name){
        req.body.slug = slugify(req.body.name)
    }
    let result = await productModel.findByIdAndUpdate(id,{...req.body},{new:true})
   !result &&  next(new AppError(`product not found`,404))
   result && res.json({message:"Done",result})
})
export const deleteProduct = deleteOne(productModel)