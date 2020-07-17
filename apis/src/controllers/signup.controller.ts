import {Request, Response} from 'express';

import { Profile } from '../../utils/interfaces/profile';
import { Status } from '../../utils/interfaces/status';

import { setActivationToken, setHash } from '../../utils/auth.utils';
import { insertProfile } from "../../utils/profile/insertProfile";

import MailComposer from "nodemailer/lib/mail-composer";
const mailgun = require("mailgun-js");

/**
 * Handles POST request for new user Profile insertion
 *
 * @param request
 * @param response
 **/
export async function signUpProfileController (request: Request, response: Response) {
	try {

		// grab the signup form data off of the request body
		const {
			signupEmail,
			signupPassword,
			signupUsername
		} = request.body;

		// hash the user's password and create the activation token
		const profileHash = await setHash(signupPassword);
		const profileActivationToken = setActivationToken();

		// create Profile object to be inserted
		const profile : Profile = {
			profileId: null,
			profileActivationToken,
			profileEmail: signupEmail,
			profileHash,
			profileUsername: signupUsername
		};

		// insert profile into mysql
		const result = await insertProfile(profile);

		// set base path for account activation link
		const basePath = `${request.protocol}://${request.get('host')}${request.originalUrl}activation/${profileActivationToken}`;

		// create a formatted message for the activation email
		const message = `<h2>Welcome to Creepy Octo Meow v8.0!</h2>
<p>In order to start posting meows of cats you must confirm your account here:</p>
<p><a href="${basePath}">${basePath}</a></p>`

		// create mailgun message
		const mailgunMessage = {
			from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
			to: signupEmail,
			subject: "Octo Meow Account Activation",
			text: 'Test email text',
			html: message
		}

		// build new mailgun email
		const emailComposer: MailComposer = new MailComposer(mailgunMessage)
		emailComposer.compile().build((error: any, message: Buffer) => {
			const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

			console.log(message.toString("ascii"))

			const compiledEmail = {
				to: signupEmail,
				message: message.toString("ascii")
			}

			const status: Status = {
				status: 200,
				message: "Profile successfully created! Please check your email to activate your account.",
				data: null
			};

			mg.messages().sendMime(compiledEmail, (sendError: any, body: any) => {
				if (sendError) {
					console.log(sendError);
					return;
				}
				return response.json(status);
			});
		})

	} catch (error) {
		const status : Status = {
			status: 400,
			message: error.message,
			data: null
		};

		return response.json(status);
	}
}