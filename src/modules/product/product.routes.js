
import express from "express";
import { uploadMixFile } from "../../utils/middleware/fileUploads.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
const ProductRouter = express.Router()
import * as productController from "./product.controller.js";

ProductRouter.route("/")
.get(productController.getAllProducts)
.post(/* protectRoutes, */
       /*  allowTo("admin,user"), */ uploadMixFile("product",[
        {name:"imgCover",maxCount:1},
        {name:"images",maxCount:8}
]),productController.createProduct)

ProductRouter.route("/:id")
.get(productController.getProductById)
.put(uploadMixFile("product",[
        {name:"imgCover",maxCount:1},
        {name:"images",maxCount:8}
]), productController.updateProduct)
.delete(productController.deleteProduct)

export default ProductRouter  