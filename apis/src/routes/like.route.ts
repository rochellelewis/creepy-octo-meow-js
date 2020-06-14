import {Router} from "express";
import {
	getLikeByLikePostIdAndLikeProfileIdController,
	getLikesByLikePostIdController,
	deleteLikeController,
	postLikeController,
	getAllLikesController
} from "../controllers/like.controller";

export const LikeRoute = Router()

LikeRoute.route("/")
	.get(getAllLikesController) // for testing only
	.post(postLikeController)

// todo: this just looks ridiculous
LikeRoute.route("/:likePostId")
	.get(getLikesByLikePostIdController)

// todo: this route is not necessary. pull profile id off of session
LikeRoute.route("/:likePostId/:likeProfileId")
	.get(getLikeByLikePostIdAndLikeProfileIdController)
	.delete(deleteLikeController)