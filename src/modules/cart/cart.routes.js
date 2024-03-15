
import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
const cartRouter = express.Router()
import * as cartController from "./cart.controller.js";

cartRouter.route("/")
.post(protectRoutes, cartController.createCart)
.get(protectRoutes, cartController.getCart)
.patch(protectRoutes,cartController.updateCart)

cartRouter.route("/:id")
.delete(protectRoutes,cartController.removeCartItem)

cartRouter.route("/:code")
.patch(protectRoutes,cartController.applyCoupon)


export default cartRouter 