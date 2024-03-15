
import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
const couponRouter = express.Router()
import * as couponController from "./coupon.controller.js";

couponRouter.route("/")
.get(couponController.getAllCoupons)
.post(protectRoutes, couponController.createCoupon)

couponRouter.route("/:id")
.put( couponController.updateCoupon)
.delete(protectRoutes, couponController.deleteCoupon)
.get(couponController.getCouponById)


export default couponRouter 