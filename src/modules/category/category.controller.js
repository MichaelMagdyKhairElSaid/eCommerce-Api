import categoryModel from "../../../DB/models/category.model.js"
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import slugify from "slugify"
import cloudinary from "../../utils/cloudinary.js"
import { nanoid } from "nanoid"
import deleteOne from "../../utils/handlers/refactor.handler.js"
import ApiFeature from "../../utils/ApiFeatures.js"
// export const addCategory = asyncHandler(async(req,res,next)=>{ 
//     const {name} = req.body
//     const exist = await categoryModel.findOne({name:name.toLowerCase()})
//     if (exist) {
//        return next(new AppError(`name already exist `,401))
//     }

// if (!req.files) {
//    return next(new AppError(`no file uploaded `,401))
// }
// console.log(req.files);
// const customId = nanoid(4)
// const imgArr = []
// for (const file of req.files) {
//     const {secure_url,public_id} =await cloudinary.uploader.upload(file.path,{
//         folder:`eCommerce/category/${customId}`
//     })
// imgArr.push({secure_url,public_id})
// }
//         const category = new categoryModel({
//             name ,
//             slug:slugify(name),
//             images:imgArr,
//             customId
//         })
//         const newCategory = await category.save();
//         if (!newCategory) {  
//             await cloudinary.uploader.destroy(public_id)
//             return next(new AppError(`fail`,400))
//         }
//       newCategory? res.status(201).json({message:"done",category}):next(new AppError(`fail`,400))
    
// })
// // *****************************update Category***************************************
// export const updateCategory = asyncHandler(async(req,res,next)=>{
//     const {id,name} = req.body //NOTE : need multer to parse form data
//     const category = await categoryModel.findById(id)
//     if (category) {
//         const imageArr =[]
//         if (category.name == name.toLowerCase()) {
//             return  next(new AppError(`it match the old name plz change it`,401))
//         }else if(await categoryModel.findOne({name:name.toLowerCase()})){
//             return  next(new AppError(`this name already exist`,401))
//         }
       
//         else{
//     //     if (req.files.images ) {
//     //    for (const ele of req.files.images) {
//     //        console.log(ele.path);
//     //        imageArr.push(ele.path)
//     //    }
//     // }
//     if (req.files) {
//         await cloudinary.uploader.destroy(category.image.public_id)
//         const {secure_url,public_id} = cloudinary.uploader.upload(req.file,{
//             folder:`eCommerce/category/${category.customId}`
//         })
//         category.image = {secure_url,public_id}
//     }
//     category.name = name
//     category.slug = slugify(name)
  
//     await category.save()
    
//         // const updatedCat = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name),image:req.files.image[0].path?req.files.image[0].path:category.image ,$push:{images:{$each:[...imageArr]}}},{new:true})
    
//         res.status(201).json({message:"done" , category})
//     }
//     }else{
//       return  next(new AppError(`categoryId doesn't exist`,401))
//     }
//     // if (req.file) {
//     //     category.image=req.file.path
//     // }
//     // category.name = name
//     // category.slug = slugify(name)
//     // await category.save()
//     //FIXME : Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
 

// })
// // ***************************** uploader***************************************
// export const uploadProfile = asyncHandler(async(req,res,next)=>{
//     res.json({message:"done",file:req.file})
// })
// // ***************************** get Category***************************************
// export const getAllCategories = asyncHandler(async(req,res,next)=>{
//     const categories = await categoryModel.find({})
//     if (!categories.length) {
//         return next(new AppError(`categories not exist`,401))
//     }
//     res.json({message:"done",categories})
// })
// // export const deletePhoto = asyncHandler(async(req,res,next)=>{

// //     res.json({message:"done",})
// // })

export const  createCategory = asyncHandler(async(req,res,next)=>{
    const {name} = req.body 
    let result = new categoryModel({name,slug:slugify(name),image:req.file.filename})
    let added  = await result.save()
    res.status(201).json({message:"Done",added})
})

export const getAllCategories = asyncHandler(async(req,res,next)=>{
    let apiFeature= new ApiFeature(categoryModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"Done",page:apiFeature.page,result})
})

export const getCategoryById = asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    let result = await categoryModel.findById(id)
    !result && next(new AppError(`category not found`,404))
    result && res.json({message:"Done",result})
})

export const updateCategory = asyncHandler(async(req,res,next)=>{
    const {name} = req.body
    const {id} = req.params
    let result = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
   !result &&  next(new AppError(`category not found`,404))
   result && res.json({message:"Done",result})
})
export const deleteCategory = deleteOne(categoryModel)