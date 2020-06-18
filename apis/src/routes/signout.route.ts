import {Router} from 'express';
import {signOutController} from "../controllers/signout.controller";

export const SignOutRoute = Router();

SignOutRoute.route("/")
	.get(signOutController);