
import express from "express";
const photoRouter = express.Router()
import * as photoController from "./photo.controller.js";

photoRouter.route("/")
.post(photoController.addPhoto)
 


export default photoRouter  