import {NextFunction, Response, Request} from 'express';
import "express-session";
import passport from "passport";
import passportLocal, {Strategy} from 'passport-local';

import uuid from "uuid";
import {generateJwt, validatePassword} from "../../utils/auth.utils";

import {Profile} from "../../utils/interfaces/profile";
import {selectProfileByProfileEmail} from "../../utils/profile/selectProfileByProfileEmail";

/**
 * Handles POST request for sign in user authentication
 *
 * @param request
 * @param response
 * @param nextFunction
 **/
export async function signInController(request: Request, response: Response, nextFunction: NextFunction) {

	try {

		// grab the profile password from the request body
		const {signinPassword} = request.body;

		passport.authenticate(
			'local',
			{session: false},
			async (err: any, passportUser: Profile) => {

				// not inserting profile email in jwt bc security. We'll be encoding the profileUsername instead.
				const {profileId, profileUsername} = passportUser;
				const signature : string = uuid();
				const authorization : string = generateJwt({profileId, profileUsername}, signature);

				const signInFailed = (message: string) => response.json({
					status: 400,
					data: null,
					message
				});

				const signInSuccessful = () => {

					if (request.session) {
						request.session.profile = passportUser;
						request.session.jwt = authorization;
						request.session.signature = signature;
					}

					response.header({
						authorization
					});

					return response.json({status: 200, data: null, message: "Sign in successful!"})
				};

				const isPasswordValid: boolean = passportUser && await validatePassword(passportUser.profileHash, signinPassword);
				return isPasswordValid ? signInSuccessful() : signInFailed("Email or password invalid.");

			})(request, response, nextFunction)

	} catch (error) {
		return response.json({status: 500, data: null, message: error.message})
	}
}

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy = new LocalStrategy(
	{
		// these are passport.js set parameter names,
		// followed by signin form field names - make sure these are correct!
		usernameField: "signinEmail",
		passwordField: "signinPassword"
	},
	async (email, password, done) => {
		try {

			const profile : Profile | undefined = await selectProfileByProfileEmail(email);
			return profile ? done(null, profile) : done(undefined, undefined, { message: 'Incorrect username or password :('});

		} catch (error) {
			return done(error);
		}
	});

export const passportMiddleware = passport.use(passportStrategy);