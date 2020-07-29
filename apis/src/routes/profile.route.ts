import {Router} from "express";

import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {profileIdValidator, profileValidator} from "../validators/profile.validator";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";

import {
	getProfileByProfileIdController,
	putProfileController,
	getAllProfilesController,
	getProfileByProfileEmailController,
	deleteProfileController
} from "../controllers/profile.controller";

const {checkSchema} = require('express-validator');

export const ProfileRoute = Router()

ProfileRoute.route("/")
	.get(getAllProfilesController)

ProfileRoute.route("/:profileId")
	.get(getProfileByProfileIdController)
	.put(isLoggedIn, asyncValidatorController(checkSchema(profileValidator)), putProfileController)
	.delete(isLoggedIn, asyncValidatorController(checkSchema(profileIdValidator)), deleteProfileController)

// todo: correct this path, check controller and get method
ProfileRoute.route("/profileEmail")
	.post(getProfileByProfileEmailController)