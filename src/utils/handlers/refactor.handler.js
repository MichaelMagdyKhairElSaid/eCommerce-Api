import { asyncHandler } from "../middleware/catchAsyncError.js"
import AppError from "../services/AppError.js" 

 const deleteOne =(model)=>{
  return asyncHandler(async(req,res,next)=>{
        const {id} = req.params
        let result = await model.findByIdAndDelete(id)
        !result &&  next(new AppError(`brand not found`,404))
        result && res.json({message:"Done",result})
    })
}

export default  deleteOne