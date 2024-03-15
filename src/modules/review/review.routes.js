
import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
const reviewRouter = express.Router()
import * as reviewController from "./review.controller.js";

reviewRouter.route("/")
.get(reviewController.getAllReviews)
.post(protectRoutes, reviewController.createReview)

reviewRouter.route("/:id")
.put(protectRoutes, reviewController.updateReview)
.delete(protectRoutes, reviewController.deleteReview)
.get(reviewController.getReviewById)


export default reviewRouter 