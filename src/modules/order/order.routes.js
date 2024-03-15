
import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
const orderRouter = express.Router()
import * as orderController from "./order.controller.js";

orderRouter.route("/:id")
.post(protectRoutes,orderController.createOrder)
orderRouter.route("/checkout/:id")
.post(protectRoutes,orderController.onlinePayment)
orderRouter.route("/")
.get(protectRoutes,orderController.getOrder)
orderRouter.route("/all")
.get(protectRoutes,orderController.getAllOrders)


export default orderRouter  