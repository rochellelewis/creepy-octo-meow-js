import {NextFunction, Request, Response} from "express";

import {Status} from "../../utils/interfaces/status";
import {Like} from "../../utils/interfaces/like";

import {insertLike} from "../../utils/like/insertLike";
import {deleteLike} from "../../utils/like/deleteLike";
import {selectLikeByLikePostIdAndLikeProfileId} from "../../utils/like/selectLikeByLikePostIdAndLikeProfileId";
import {selectLikesByLikePostId} from "../../utils/like/selectLikesByLikePostId";
import {selectAllLikes} from "../../utils/like/selectAllLikes";
import {Profile} from "../../utils/interfaces/profile";


/**
 * Handles POST request to insert a new Like into mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function postLikeController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab profile data off of session for authorization
		const profile: Profile = request.session?.profile
		const sessionProfileId = <string> profile.profileId

		// grab the like data off the request body
		const {
			likePostId,
			likeProfileId
		} = request.body;

		// verify likeProfileId matches sessionProfileId - a user can only post likes for their own account!
		if(sessionProfileId !== likeProfileId) {
			return response.json({
				status: 403, // forbidden!
				data: null,
				message: "You're not allowed to like meows for this account."
			});
		}

		// create the Like to be inserted
		const like: Like = {
			likePostId,
			likeProfileId
		}

		const result = await insertLike(like)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		return response.json({status: error.status, data: error.data, message: error.message})
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

		// grab profile data off of session for authorization
		const profile: Profile = request.session?.profile
		const sessionProfileId = <string> profile.profileId

		// grab the like data off the request body
		const {
			likePostId,
			likeProfileId
		} = request.body;

		// verify likeProfileId matches sessionProfileId - a user can only delete  likes for their own account!
		if(sessionProfileId !== likeProfileId) {
			return response.json({
				status: 403, // forbidden!
				data: null,
				message: "You're not allowed to unlike meows for this account."
			});
		}

		const result = await deleteLike(likePostId, likeProfileId)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		return response.json({status: error.status, data: error.data, message: error.message})
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