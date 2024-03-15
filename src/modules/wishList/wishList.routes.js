
import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
const wishListRouter = express.Router()
import * as wishListController from "./wishList.controller.js";

wishListRouter.patch("/:productId",protectRoutes,wishListController.addToWishList)
wishListRouter.delete("/:productId",protectRoutes,wishListController.removeFromWishList)
wishListRouter.get("/",protectRoutes,wishListController.getAllWishList)


export default wishListRouter 