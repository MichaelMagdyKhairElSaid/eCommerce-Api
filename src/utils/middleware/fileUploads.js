import multer from "multer"
import AppError from "../../utils/services/AppError.js";

const option = (folderName)=>{
  const storage = multer.diskStorage({
    destination:function(req,file,cb) {
      cb(null,`upload/${folderName}`)
    },
    filename:function (req,file,cb) {
      const uniqueSuffix= Date.now()+"-"+Math.round(Math.random()*1e9);
      cb(null,uniqueSuffix+"-"+file.originalname)
    }
  });
  
  function fileFilter(req,file,cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null,true);
    }else{
        cb(new AppError("Invalid image",400),false);
    }
  }
  
  return multer({storage,fileFilter})
}

export const uploadSingleFile =(folderName,fieldName)=>option(folderName).single(fieldName)


export const uploadMixFile =(folderName,arrayfields)=>option(folderName).fields(arrayfields) 


