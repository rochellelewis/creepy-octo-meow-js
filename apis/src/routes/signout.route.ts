import {Router} from 'express';
import {signOut} from "../controllers/signout.controller";

export const SignOutRoute = Router();

SignOutRoute.route("/")
	.get(signOut);