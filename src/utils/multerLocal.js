import multer from "multer";
import { nanoid } from "nanoid";
import  AppError  from "./services/AppError.js";
import  path  from "path";
import fs from "fs";

export const acceptedExtention ={
    image:["image/jpeg","image/png"],
    pdf:["application/pdf"],
}

export const multerFun =(Extentions ,customPath)=>{             // [] used to know that params is array
    if(!Extentions){                                //if no array is given
        Extentions = acceptedExtention.image 
    }
    console.log(Extentions);
    const uploadsPath = path.resolve(`upload${customPath}`) 
    console.log(uploadsPath);
    if (!fs.existsSync(uploadsPath)) {              //if current directory doesnt exist creat it
        fs.mkdirSync(uploadsPath,{recursive:true}) // recursive:true used to create path even the first file doset exist
    }
    //filename
    //distination
 const storage =  multer.diskStorage({
        destination:function (req,file,cb) {
            cb(null,uploadsPath)
        },
        filename:function (req,file,cb) {
            cb(null,nanoid(5)+file.originalname)   // nanoid used for unique name
            
        }
    })

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