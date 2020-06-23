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

// this is all the app requires:
LikeRoute.route("/")
	.get(getAllLikesController)
	.post(asyncValidatorController(checkSchema(likeValidator)), postLikeController)
	.delete(asyncValidatorController(checkSchema(likeValidator)), deleteLikeController)

// This just looks ridiculous... it's an example :P
LikeRoute.route("/post/:likePostId")
	.get(getLikesByLikePostIdController)

// this route is not necessary IRL... it's just an example :P IRL... pull profile id off of session
LikeRoute.route("/:likePostId/:likeProfileId")
	.get(getLikeByLikePostIdAndLikeProfileIdController)