import photoModel from "../../../DB/models/photo.model.js";
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js";
import cloudinary  from "../../utils/cloudinary.js"

export const addPhoto=asyncHandler(async(req,res,next)=>{
    if (!req.file) {
        return res.status(400).json({message:"invalid file"})
    }
    let {secure_url} =await cloudinary.uploader.upload(req.file.path,{folder:"Photos"})
    let {createdBy}=req.body
    await photoModel.insertMany({path:secure_url,createdBy})
    res.json({message:"Done"})
})