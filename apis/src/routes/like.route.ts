import {Router} from "express";
import {
	getLikeByLikePostIdAndLikeProfileIdController,
	getLikesByLikePostIdController,
	deleteLikeController,
	postLikeController
} from "../controllers/like.controller";

export const LikeRoute = Router()

LikeRoute.route("/")
	.post(postLikeController)

// todo: this just looks ridiculous
LikeRoute.route("/:likePostId")
	.get(getLikesByLikePostIdController)

// todo: this route is not necessary. pull profile id off of session
LikeRoute.route("/:likePostId/:likeProfileId")
	.get(getLikeByLikePostIdAndLikeProfileIdController)
	.delete(deleteLikeController)