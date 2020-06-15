import {Router} from "express";

import {asyncValidator} from "../lib/asyncValidator";
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
	.post(asyncValidator(checkSchema(postValidator)), postPostController)

// todo: this route may not be necessary? Maybe.
PostRoute.route("/:postId")
	.get(getPostByPostIdController)
	.put(putPostController)
	.delete(deletePostController)