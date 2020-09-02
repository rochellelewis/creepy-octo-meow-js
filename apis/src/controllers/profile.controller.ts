import {NextFunction, Request, Response} from "express";

import {Status} from "../../utils/interfaces/status";
import {Profile} from "../../utils/interfaces/profile";

import {updateProfile} from "../../utils/profile/updateProfile";
import {selectProfileByProfileActivationToken} from "../../utils/profile/selectProfileByProfileActivationToken"
import {selectProfileByProfileId} from "../../utils/profile/selectProfileByProfileId";
import {selectAllProfiles} from "../../utils/profile/selectAllProfiles";
import {selectProfileByProfileEmail} from "../../utils/profile/selectProfileByProfileEmail";
import {setHash} from "../../utils/auth.utils";
import {deleteProfile} from "../../utils/profile/deleteProfile";

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

		// grab profile data off of user session
		const sessionProfile: Profile = request.session?.profile
		const sessionProfileId = <string> sessionProfile.profileId
		const activationToken = <string> sessionProfile.profileActivationToken

		// disallow profile editing if the account is unverified
		if(activationToken !== null) {
			return response.json({
				status: 418, // attempting to brew coffee with a teapot?
				data: null,
				message: "Please check your email and activate your account before attempting to edit your profile."
			});
		}

		// verify the profileId from the session matches the profileId that the user is attempting to edit
		if(sessionProfileId !== profileId) {
			return response.json({
				status: 403, // forbidden!
				data: null,
				message: "Hey! You're not allowed to edit this account!"
			});
		}

		// grab the updated profile data off of the request body
		const {
			profileEmail,
			profilePassword,
			profileUsername
		} = request.body;

		// create new hash value for updated password
		const profileHash = await setHash(profilePassword);

		// create the Profile object to be inserted
		const updatedProfile: Profile = {
			profileId,
			profileActivationToken: null, // this won't get updated in mysql, but is needed to create this Profile object
			profileEmail,
			profileHash,
			profileUsername
		}

		const result = await updateProfile(updatedProfile)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		return response.json({status: error.status, data: error.data, message: error.message})
	}
}

/**
 * Handles DELETE request to delete a Profile from mysql
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function deleteProfileController(request: Request, response: Response, nextFunction: NextFunction) {
	try {

		// grab profile data off of session
		const profile: Profile = request.session?.profile
		const sessionProfileId = <string> profile.profileId

		// grab the profileId off the request body
		const {profileId} = request.body;

		// verify the profileId from the session matches the profileId that the user is attempting to delete
		if(sessionProfileId !== profileId) {
			return response.json({
				status: 403, // forbidden!
				data: null,
				message: "Hey! You're not allowed to delete this account!"
			});
		}

		const result = await deleteProfile(profileId)
		return response.json({status: 200, data: null, message: result})

	} catch(error) {
		return response.json({status: error.status, data: error.data, message: error.message})
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

		// lock access to view profile data to the signed in account only
		const profile: Profile = request.session?.profile ?? "Nobody signed in!"
		const sessionProfileId = <string> profile.profileId

		if(sessionProfileId !== profileId) {
			return response.json({
				status: 403, // forbidden!
				data: null,
				message: "You are not allowed to view this profile data."
			});
		}

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

		// lock access to this request to sister.octo.meow only! See .env
		const profile: Profile = request.session?.profile ?? "Nobody signed in!"
		const sessionProfileId = <string> profile.profileId
		const adminId = process.env.ADMIN_ID;

		if(sessionProfileId !== adminId) {
			return response.json({
				status: 403, // forbidden!
				data: null,
				message: "Only boss sister.octo.meow can GET all the meow profile data :P"
			});
		}

		const data = await selectAllProfiles()
		console.log(data)

		const status: Status = {status: 200, data, message: null}
		return response.json(status)

	} catch(error) {
		console.log(error)
	}
}