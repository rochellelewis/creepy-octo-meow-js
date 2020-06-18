import {NextFunction, Request, Response} from "express";

import {Status} from "../../utils/interfaces/status";
import {Profile} from "../../utils/interfaces/profile";

import {updateProfile} from "../../utils/profile/updateProfile";
import {selectProfileByProfileActivationToken} from "../../utils/profile/selectProfileByProfileActivationToken"
import {selectProfileByProfileId} from "../../utils/profile/selectProfileByProfileId";
import {selectAllProfiles} from "../../utils/profile/selectAllProfiles";
import {selectProfileByProfileEmail} from "../../utils/profile/selectProfileByProfileEmail";
import {setHash} from "../../utils/auth.utils";

/**
 * Handles PUT request to update a profile in mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function putProfileController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the profile id off of the request parameters
		const {profileId} = request.params;

		// grab the profile data off of the request body
		const {
			profileActivationToken,
			profileEmail,
			profilePassword,
			profileUsername
		} = request.body;

		// create new hash value for updated password
		const profileHash = await setHash(profilePassword);

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

/**
 * Handles GET request to select a profile by email address
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getProfileByProfileEmailController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab the profile id off the request parameters
		// const {profileEmail} = request.params;
		const {profileEmail} = request.body;


		const data = await selectProfileByProfileEmail(profileEmail)
		console.log(data)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}

/**
 * Handles GET request to select all Profiles from mysql - for testing purposes only
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function getAllProfilesController(request: Request, response: Response, nextFunction: NextFunction) {
	try {
		const data = await selectAllProfiles()
		console.log(data)

		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}