
import express from "express";
import { acceptedExtention, multerFun  } from "../../utils/multerLocal.js";
import { multerCloud  } from "../../utils/multerCloud.js";
const CategoryRouter = express.Router()
import * as categoryController from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import {uploadSingleFile} from "../../utils/middleware/fileUploads.js";





/* 
import { validation } from "../../utils/middleware/validation.js";
import { createCategorySchema } from "./category.validation.js";
  */

/* CategoryRouter.post("/category",multerCloud(acceptedExtention.image).array("images",2),categoryController.addCategory)
CategoryRouter.patch("/updateCategory",multerCloud(acceptedExtention.image).array("images",2),categoryController.updateCategory)  // multer parse form data
CategoryRouter.patch("/getAllCategories",categoryController.getAllCategories)  
// CategoryRouter.patch("/updateCategory",multerFun(acceptedExtention.image,"/profile/users").fields([{name:"image",maxCount:"1"},{name:"images",maxCount:"3"}]),categoryController.updateCategory)  // multer parse form data
/* CategoryRouter.post("/upload",multerFun(acceptedExtention.image,"/profile/users").single("image"),uploadProfile)*/ // ctrl + shift + A */
CategoryRouter.use("/:id/subCategory",subCategoryRouter)

CategoryRouter.route("/")
.get(categoryController.getAllCategories)
.post( uploadSingleFile("category","image"),/* validation(createCategorySchema) ,*/categoryController.createCategory)

CategoryRouter.route("/:id")
.get(categoryController.getCategoryById)
.put(categoryController.updateCategory)
.delete(categoryController.deleteCategory)

export default CategoryRouter  