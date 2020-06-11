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

LikeRoute.route("/:likePostId")
	.get(getLikesByLikePostIdController)

LikeRoute.route("/:likePostId/:likeProfileId")
	.get(getLikeByLikePostIdAndLikeProfileIdController)
	.delete(deleteLikeController)