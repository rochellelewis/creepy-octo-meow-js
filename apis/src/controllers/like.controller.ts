import {NextFunction, Request, Response} from "express";

import {Status} from "../../utils/interfaces/status";
import {Like} from "../../utils/interfaces/like";

import {insertLike} from "../../utils/like/insertLike";
import {deleteLike} from "../../utils/like/deleteLike";
import {selectLikeByLikePostIdAndLikeProfileId} from "../../utils/like/selectLikeByLikePostIdAndLikeProfileId";
import {selectLikesByLikePostId} from "../../utils/like/selectLikesByLikePostId";
import {selectAllLikes} from "../../utils/like/selectAllLikes";


/**
 * Handles POST request to insert a new Like into mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function postLikeController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the like data off the request body
		const {
			likePostId,
			likeProfileId
		} = request.body;

		// create the Like to be inserted
		const like: Like = {
			likePostId,
			likeProfileId
		}

		const result = await insertLike(like)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles DELETE request to delete a Like from mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function deleteLikeController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the like data off the request parameters
		const {
			likePostId,
			likeProfileId
		} = request.params;

		const result = await deleteLike(likePostId, likeProfileId)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select a single Like by post id and profile id
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getLikeByLikePostIdAndLikeProfileIdController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the like data off the request parameters
		const {
			likePostId,
			likeProfileId
		} = request.params;

		const data = await selectLikeByLikePostIdAndLikeProfileId(likePostId, likeProfileId)
		console.log(data)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select all Likes by post id
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getLikesByLikePostIdController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the likePostId off the request parameters
		const {likePostId} = request.params;

		const data = await selectLikesByLikePostId(likePostId)
		console.log(data)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select all Likes from mysql - for testing purposes only
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getAllLikesController(request: Request, response: Response, nextFunction: NextFunction) {
	try {
		const data = await selectAllLikes()
		console.log(data)

		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}