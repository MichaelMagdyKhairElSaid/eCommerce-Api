import multer from "multer";
import  AppError  from "./services/AppError.js";

export const acceptedExtention ={
    image:["image/jpeg","image/png"],
    pdf:["application/pdf"],
}

export const multerCloud =(Extentions)=>{            // [] used to know that params is array
    if(!Extentions){                                 //if no array is given
        Extentions = acceptedExtention.image 
    }
 const storage =  multer.diskStorage({})         //NOTE:must take empty object 

const fileFilter =(req,file,cb)=>{
    if (Extentions.includes(file.mimetype)) {
        cb(null,true)
    }else{
        cb(new AppError(`invalid file extention`,400 ), false)
    }
}

    const uploader =multer({fileFilter, storage})
    return uploader
} 