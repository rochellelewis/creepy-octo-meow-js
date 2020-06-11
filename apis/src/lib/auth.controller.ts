import passport from 'passport';
import passportLocal, {Strategy} from 'passport-local';

import {Profile} from "../../utils/interfaces/profile";
import {selectProfileByProfileEmail} from "../../utils/profile/selectProfileByProfileEmail";

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy = new LocalStrategy(
	{
		usernameField: 'profileEmail',
		passwordField: "profilePassword"
	},
	async (email, password, done) => {
		try {

			const profile = await selectProfileByProfileEmail(email);

			return profile ? done(null, profile) : done(undefined, undefined, { message: 'Incorrect username or password'});
		}

		catch (error) {
			return done(error);
		}
	});

export const  passportMiddleware = passport.use(passportStrategy);