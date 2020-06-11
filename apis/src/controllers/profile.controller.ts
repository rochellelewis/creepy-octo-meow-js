import {NextFunction, Request, Response} from "express";

import {Status} from "../../utils/interfaces/status";
import {Profile} from "../../utils/interfaces/profile";

import {insertProfile} from "../../utils/profile/insertProfile";
import {updateProfile} from "../../utils/profile/updateProfile";
import {selectProfileByProfileActivationToken} from "../../utils/profile/selectProfileByProfileActivationToken"
import {selectProfileByProfileId} from "../../utils/profile/selectProfileByProfileId";

/**
 * Handles POST request to insert a new profile into mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function postProfileController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the profile data off of the request body
		const {
			profileActivationToken,
			profileEmail,
			profileHash,
			profileUsername
		} = request.body;

		// create the Profile object to be inserted
		const profile: Profile = {
			profileId: null,
			profileActivationToken,
			profileEmail,
			profileHash,
			profileUsername
		}

		const result = await insertProfile(profile)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles PUT request to update a profile in mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function updateProfileController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the profile id off of the request parameters
		const {profileId} = request.params;

		// grab the profile data off of the request body
		const {
			profileActivationToken,
			profileEmail,
			profileHash,
			profileUsername
		} = request.body;

		// create the Profile object to be inserted
		const profile: Profile = {
			profileId,
			profileActivationToken,
			profileEmail,
			profileHash,
			profileUsername
		}

		const result = await updateProfile(profile)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select a profile by activation token
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getProfileByProfileActivationTokenController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the profile id off the request parameters
		const {profileActivationToken} = request.params;

		const data = await selectProfileByProfileActivationToken(profileActivationToken)
		console.log(data)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select a profile by id
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getProfileByProfileIdController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the profile id off the request parameters
		const {profileId} = request.params;

		const data = await selectProfileByProfileId(profileId)
		console.log(data)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}