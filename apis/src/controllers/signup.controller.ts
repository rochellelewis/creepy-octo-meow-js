import {Request, Response} from 'express';

import { Profile } from '../../utils/interfaces/profile';
import { Status } from '../../utils/interfaces/status';

import { setActivationToken, setHash } from '../lib/auth.utils';
import { insertProfile } from "../../utils/profile/insertProfile";

const { validationResult } = require('express-validator');

/**
 * Handles POST request for new user Profile insertion
 *
 * @param request
 * @param response
 **/
export async function signUpProfileController (request: Request, response: Response) {
	try {

		validationResult(request).throw();

		// grab the profile data off of the request body
		const {
			profileEmail,
			profilePassword,
			profileUsername
		} = request.body;

		// hash the user's password and create the activation token
		const profileHash = await setHash(profilePassword);
		const profileActivationToken = setActivationToken();

		// create Profile object to be inserted
		const profile : Profile = {
			profileId: null,
			profileActivationToken,
			profileEmail,
			profileHash,
			profileUsername
		};

		const result = await insertProfile(profile);

		return response.json({status: 200, data: null, message: result})

	} catch (error) {
		const status : Status = {
			status: 400,
			message: error.message,
			data: null
		};

		return response.json(status);
	}
}