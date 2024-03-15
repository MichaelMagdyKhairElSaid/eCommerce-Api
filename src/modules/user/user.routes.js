
import express from "express";
const userRouter = express.Router()
import * as userController from "./user.controller.js";

userRouter.route("/")
.get(userController.getAllUsers)
.post(userController.createUser)
 
userRouter.route("/:id")
.get(userController.getUserById)
.put(userController.updateUser)
.delete(userController.deleteUser)

userRouter.patch("/changePassword/:id",userController.ChangePassword)

export default userRouter  