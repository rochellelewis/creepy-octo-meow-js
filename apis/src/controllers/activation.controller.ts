import {NextFunction, Request, Response} from "express";

import {Profile} from "../../utils/interfaces/profile";
import {updateProfile} from "../../utils/profile/updateProfile";
import {selectProfileByProfileActivationToken} from "../../utils/profile/selectProfileByProfileActivationToken";

export async function activationController(request: Request, response: Response, nextFunction: NextFunction) {

	// grab activation token from request params
	const {activation} = request.params

	try {

		const profile =  await selectProfileByProfileActivationToken(activation)

		const activationFailed = () => response.json({
			status: 400,
			data: null,
			message: "Account activation has failed. Have you already activated this account?"
		});

		const activationSucceeded = async (profile: Profile) => {
			const updatedProfile = {...profile, profileActivationToken: null}
			await updateProfile(updatedProfile)
			return response.json({
				status: 200,
				data: null,
				message: "Account activation was successful! :D"
			});
		}

		profile ? await activationSucceeded(profile) : activationFailed()

	} catch (error) {
		return response.json({status: 500, data: null, message: error.message})
	}
}