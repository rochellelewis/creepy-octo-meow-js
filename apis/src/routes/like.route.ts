import {Router} from "express";

import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {likeValidator} from "../validators/like.validator";
import {isLoggedIn} from "../validators/isLoggedIn.validator";

import {
	getLikeByLikePostIdAndLikeProfileIdController,
	getLikesByLikePostIdController,
	deleteLikeController,
	postLikeController,
	getAllLikesController
} from "../controllers/like.controller";

const {checkSchema} = require("express-validator");

export const LikeRoute = Router()

LikeRoute.route("/")
	.get(getAllLikesController) // for testing only
	.post(asyncValidatorController(checkSchema(likeValidator)), postLikeController)

// todo: this just looks ridiculous
LikeRoute.route("/post/:likePostId")
	.get(getLikesByLikePostIdController)

// todo: this route is not necessary IRL. pull profile id off of session
LikeRoute.route("/:likePostId/:likeProfileId")
	.get(getLikeByLikePostIdAndLikeProfileIdController)
	.delete(deleteLikeController)