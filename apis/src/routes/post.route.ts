import {Router} from "express";

import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {postValidator} from "../validators/post.validator";
import {isLoggedIn} from "../validators/isLoggedIn.validator";

import {
	getAllPostsController,
	getPostByPostIdController,
	postPostController,
	putPostController,
	deletePostController
} from "../controllers/post.controller";

const {checkSchema} = require("express-validator");

export const PostRoute = Router()

PostRoute.route("/")
	.get(getAllPostsController)
	.post(asyncValidatorController(checkSchema(postValidator)), postPostController)

// todo: this route may not be necessary? Maybe.
PostRoute.route("/:postId")
	.get(getPostByPostIdController)
	.put(asyncValidatorController(checkSchema(postValidator)), putPostController)
	.delete(deletePostController)