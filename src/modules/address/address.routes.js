
import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
const addressRouter = express.Router()
import * as addressController from "./address.controller.js";
addressRouter.patch("/",protectRoutes,addressController.addAddress)
addressRouter.delete("/",protectRoutes,addressController.removeAddress)
addressRouter.get("/",protectRoutes,addressController.getAllAddress)


export default addressRouter 