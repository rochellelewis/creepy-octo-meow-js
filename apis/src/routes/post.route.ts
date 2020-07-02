import {Router} from "express";
import {
	getAllPostsController,
	getPostByPostIdController,
	postPostController,
	putPostController,
	deletePostController
} from "../controllers/post.controller";

import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {postIdValidator, postValidator, putPostValidator} from "../validators/post.validator";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
const {checkSchema} = require("express-validator");

export const PostRoute = Router()

PostRoute.route("/")
	.get(getAllPostsController)
	.post(isLoggedIn, asyncValidatorController(checkSchema(postValidator)), postPostController)

PostRoute.route("/:postId")
	.get(getPostByPostIdController)
	.put(isLoggedIn, asyncValidatorController(checkSchema(putPostValidator)), putPostController)
	.delete(isLoggedIn, asyncValidatorController(checkSchema(postIdValidator)), deletePostController)