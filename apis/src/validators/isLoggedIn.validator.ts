import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError, verify} from "jsonwebtoken";

import {Status} from "../../utils/interfaces/status";
import {Profile} from "../../utils/interfaces/profile";

/**
 * Checks for active user session
 *
 * @param request
 * @param response
 * @param next
 **/
export function isLoggedIn(request: Request, response: Response, next: NextFunction): any {

	let status : Status = {status: 400, message: "Please login", data: null};

	// grab the profile data from the session, if it exists
	const sessionProfile  = (request : Request): Profile | undefined => request.session?.profile ?? undefined;

	// grab the session signature, if it exists
	const signature = (request : Request) : string => request.session?.signature ?? "no signature"

	// true | false if session is active
	const isSessionActive = (isProfileActive: Profile | undefined) : boolean => isProfileActive ? true : false;

	// grab auth data from request headers
	const getJwtTokenFromHeader = (headers: any) : string => {
		return headers["authorization"];
	};

	const unverifiedJwtToken: string = getJwtTokenFromHeader(request.headers);

	// check jwt fof validity
	const isJwtValid: any = unverifiedJwtToken
		? verify(
			unverifiedJwtToken,
			signature(request),
			{maxAge: "3hr"},
			(error: any, decoded: any) => error ? false : true
		) : false;

	return isJwtValid && isSessionActive(sessionProfile(request)) ? next() : response.json(status);
}

