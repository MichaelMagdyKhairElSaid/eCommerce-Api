import  AppError  from "../utils/services/AppError.js";
import { globalError } from "../utils/middleware/globalErrorHandle.js";

import categoryRoutes from"./category/category.routes.js"
import subCategoryRoutes from "./subCategory/subCategory.routes.js";
import brandRoutes from "./brand/brand.routes.js";
import ProductRoutes from "./product/product.routes.js";
import userRoutes from "./user/user.routes.js";
import authRoutes from "./auth/auth.routes.js";
import wishListRoutes from "./wishList/wishList.routes.js";
import addressRouter from "./address/address.routes.js";
import reviewRoutes from "./review/review.routes.js";
import couponRouter from "./coupon/coupon.routes.js";
import cartRouter from "./cart/cart.routes.js";
import orderRouter from "./order/order.routes.js";
import photoRouter from "./photos/photo.route.js";

export function init(app) {
    
    app.use("/api/v1/category",categoryRoutes)
    app.use("/api/v1/subCategory",subCategoryRoutes)
    app.use("/api/v1/brand",brandRoutes)
    app.use("/api/v1/product",ProductRoutes)
    app.use("/api/v1/user",userRoutes)
    app.use("/api/v1/auth",authRoutes)
    app.use("/api/v1/wishList",wishListRoutes)
    app.use("/api/v1/address",addressRouter)
    app.use("/api/v1/review",reviewRoutes)
    app.use("/api/v1/coupon",couponRouter)
    app.use("/api/v1/cart",cartRouter)
    app.use("/api/v1/order",orderRouter)
    app.use("/api/v1/photo",photoRouter)

    app.all("*",(req,res,next)=>{ 
        next(new AppError(`Invalid URL ${req.originalUrl}`,404))    
    }) //NOTE invalid url handeler must be after all routes
    
    app.use(globalError)
}

    


