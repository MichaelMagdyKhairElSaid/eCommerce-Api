import express from "express";
import * as authController from "./auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signUp" ,authController.signUp); 
authRouter.post("/signIn", authController.signIn);
authRouter.patch("/logout", authController.logOut);

export default authRouter;