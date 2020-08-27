import {Request, Response} from 'express';

import { Profile } from '../../utils/interfaces/profile';
import { Status } from '../../utils/interfaces/status';

import {selectProfileByProfileActivationToken} from "../../utils/profile/selectProfileByProfileActivationToken";

import MailComposer from "nodemailer/lib/mail-composer";
const mailgun = require("mailgun-js");

/**
 * Handles request to resend activation email
 *
 * @param request
 * @param response
 **/
export async function resendActivationEmailController (request: Request, response: Response) {
	try {

		// grab activation token off request body
		const {activation} = request.body;

		// grab profile by activation token
		const profile = await selectProfileByProfileActivationToken(activation)
		const profileEmail = <string> profile.profileEmail

		// secure this api by checking the active session profileId against the profile we pulled from mysql
		const sessionProfile: Profile = request.session?.profile
		const sessionProfileId = <string> sessionProfile.profileId
		if(sessionProfileId !== profile.profileId) {
			return response.json({
				status: 403, // forbidden!
				data: null,
				message: "Authentication Error... Stahp."
			});
		}

		// set base path for account activation link - development
		// const basePath = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

		// set base path for account activation link - live deployment
		const basePath = `${request.protocol}://${request.get('host')}/activation/${activation}`;


		// create a formatted message for the activation email
		const message = `<h2>Welcome to Creepy Octo Meow v8.0!</h2>
<p>In order to start posting meows of cats you must confirm your account here:</p>
<p><a href="${basePath}">${basePath}</a></p>`

		// create mailgun message
		const mailgunMessage = {
			from: `Octo Meow 8.0 <postmaster@${process.env.MAILGUN_DOMAIN}>`,
			to: profileEmail,
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
				to: profileEmail,
				message: message.toString("ascii")
			}

			const status: Status = {
				status: 200,
				message: "Please check your email to activate your account.",
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

	} catch(error) {
		const status : Status = {
			status: 400,
			message: error.message,
			data: null
		};

		return response.json(status);
	}
}