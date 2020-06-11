import {Router} from "express";
import {
	getAllPostsController,
	getPostByPostIdController,
	postPostController,
	putPostController,
	deletePostController
} from "../controllers/post.controller";

export const PostRoute = Router()

PostRoute.route("/")
	.get(getAllPostsController)
	.post(postPostController)

PostRoute.route("/:postId")
	.get(getPostByPostIdController)
	.put(putPostController)
	.delete(deletePostController)