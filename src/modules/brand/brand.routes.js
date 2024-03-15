
import express from "express";
const brandRouter = express.Router()
import * as brandController from "./brand.controller.js";
import {uploadSingleFile} from "../../utils/middleware/fileUploads.js";

import { validation } from "../../utils/middleware/validation.js";
import { creatBrandSchema, updateBrandSchema } from "./brand.validation.js";

brandRouter.route("/")
.get(brandController.getAllBrands)
.post(uploadSingleFile("brand","logo"),  validation(creatBrandSchema) , brandController.createBrand)

brandRouter.route("/:id")
.put( uploadSingleFile("brand","logo"),  validation(updateBrandSchema) ,brandController.updateBrand)
.delete(brandController.deleteBrand)
.get(brandController.getBrandById)


export default brandRouter 