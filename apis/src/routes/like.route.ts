import {Router} from "express";

import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {likeValidator} from "../validators/like.validator";
import {isLoggedIn} from "../validators/isLoggedIn.validator";

import {
	deleteLikeController,
	postLikeController,
	getAllLikesController
} from "../controllers/like.controller";

const {checkSchema} = require("express-validator");

export const LikeRoute = Router()

LikeRoute.route("/")
	.get(getAllLikesController)
	.post(isLoggedIn, asyncValidatorController(checkSchema(likeValidator)), postLikeController)
	.delete(isLoggedIn, asyncValidatorController(checkSchema(likeValidator)), deleteLikeController)