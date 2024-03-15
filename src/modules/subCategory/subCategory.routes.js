
import express from "express";
import { acceptedExtention, multerFun  } from "../../utils/multerLocal.js";
import { multerCloud  } from "../../utils/multerCloud.js";
const subCategoryRouter = express.Router({mergeParams:true})
import * as subCategoryController from "./subCategory.controller.js";
/*  
subCategoryRouter.post("/category",multerCloud(acceptedExtention.image).array("images",2),subCategoryController.addSubCategory)
subCategoryRouter.patch("/updateCategory",multerCloud(acceptedExtention.image).array("images",2),subCategoryController.updateSubCategory)  // multer parse form data
subCategoryRouter.patch("/getAllCategories",subCategoryController.getAllSubCategories)  

 */
subCategoryRouter.route("/")
.get(subCategoryController.getAllSubCategories)
.post(subCategoryController.createSubCategory)

subCategoryRouter.route("/:id")
.get(subCategoryController.getSubCategoryById)
.put(subCategoryController.updateSubCategory)
.delete(subCategoryController.deleteSubCategory)

export default subCategoryRouter 