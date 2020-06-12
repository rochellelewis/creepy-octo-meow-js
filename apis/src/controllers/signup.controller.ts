import { Request, Response } from 'express';
import { connect } from '../database';

import { setActivationToken, setHash } from '../lib/auth.utils';
import { Profile } from '../../utils/interfaces/profile';
import { Status } from '../../utils/interfaces/status';

const { validationResult } = require('express-validator');

/**
 * Handles POST request for new user Profile insertion
 *
 * @param request
 * @param response
 **/
export async function signUpProfile (request: Request, response: Response) {
	try {

		validationResult(request).throw();

		// grab the profile data off of the request body
		const {
			profileEmail,
			profilePassword,
			profileUsername
		} = request.body;

		const mysqlConnection = await connect();
		const profileHash = await setHash(profilePassword);
		const profileActivationToken = setActivationToken();

		// create Profile to be inserted
		const profile : Profile = {
			profileId: null,
			profileActivationToken,
			profileEmail,
			profileHash,
			profileUsername
		};

		const query : string = "INSERT INTO profile(profileId, profileActivationToken, profileEmail, profileHash, profileUsername) VALUES(UUID_TO_BIN(UUID()), :profileActivationToken, :profileEmail, :profileHash, :profileUsername)";

		await mysqlConnection.execute(query, profile);

		const status: Status = {
			status: 200,
			message: 'Profile successfully created! :D',
			data: null
		};

		return response.json(status);

	} catch (error) {
		const status : Status = {
			status: 400,
			message: error.message,
			data: null
		};

		return response.json(status);
	}
}