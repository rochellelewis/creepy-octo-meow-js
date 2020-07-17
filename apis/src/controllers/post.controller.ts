import {NextFunction, Request, Response} from "express";

import {Status} from "../../utils/interfaces/status";
import {Post} from "../../utils/interfaces/post";
import {Profile} from "../../utils/interfaces/profile";

import {insertPost} from "../../utils/post/insertPost";
import {deletePost} from "../../utils/post/deletePost";
import {updatePost} from "../../utils/post/updatePost";
import {selectAllPosts} from "../../utils/post/selectAllPosts";
import {selectPostByPostId} from "../../utils/post/selectPostByPostId";

/**
 * Handles POST request to insert a new Post into mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function postPostController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab profile data off of session
		const profile: Profile = request.session?.profile
		const postProfileId = <string> profile.profileId
		const activationToken = <string> profile.profileActivationToken

		// no posting allowed from non activated accounts
		if(activationToken !== null) {
			return response.json({
				status: 418, // attempting to brew coffee with a teapot?
				data: null,
				message: "Please check your email and activate your account before attempting to meow."
			});
		}

		// grab the post data off the request body
		const {
			postContent,
			postTitle
		} = request.body;

		// create the Post to be inserted
		const post: Post = {
			postId: null,
			postProfileId,
			postContent,
			postDate: new Date,
			postTitle
		}

		const result = await insertPost(post)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		return response.json({status: error.status, data: error.data, message: error.message})
	}
}

/**
 * Handles DELETE request to delete a Post from mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function deletePostController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the post id off the request parameters
		const {postId} = request.params;

		// TODO: do profileId check against postProfileId to verify permission to delete
		// grab profile from session to verify user is allowed to delete this post
		// const profile: Profile = request.session?.profile
		// const profileId = <string> profile.profileId
		// console.log("profileid: " + profileId);

		// grab post by id
		// const post = await selectPostByPostId(postId)

		const result = await deletePost(postId)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles PUT request to update an existing Post in mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function putPostController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// todo: restrict editing post only to account that originally posted

		// grab the post id off of the request parameters
		const {postId} = request.params;

		// grab the post data off the request body
		const {
			postProfileId,
			postContent,
			postTitle
		} = request.body;

		// create the Post to be updated
		const post: Post = {
			postId,
			postProfileId,
			postContent,
			postDate: new Date,
			postTitle
		}

		const result = await updatePost(post)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select all Posts from mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getAllPostsController(request: Request, response: Response, nextFunction: NextFunction) {
	try {
		const data = await selectAllPosts()
		console.log(data)

		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select a Post by id
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getPostByPostIdController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the post id off of the request parameter
		const {postId} = request.params;

		const data = await selectPostByPostId(postId)
		console.log(data)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}