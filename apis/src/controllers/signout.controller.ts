import {Request, Response} from "express";
import {Status} from '../../utils/interfaces/status';

/**
 * Handles GET request to end active user session
 *
 * @param request
 * @param response
 **/
export function signOutController(request: Request, response : Response) {

	const {session} = request;
	let status : Status = {status: 200, message: "sign out successful", data: null};

	const executeSignOut = () => {
		// @ts-ignore: broken typing is requiring a callback function that is optional.
		session?.destroy()
	};

	const signOutFailed = () => {
		status.status = 400;
		status.message = "You are not signed in.";
	};

	session ? executeSignOut() : signOutFailed();

	return response.json(status)
}
