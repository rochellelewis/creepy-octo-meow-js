import {Router} from "express";

import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {profileValidator} from "../validators/profile.validator";

import {
	getProfileByProfileActivationTokenController,
	getProfileByProfileIdController,
	putProfileController,
	getAllProfilesController,
	getProfileByProfileEmailController
} from "../controllers/profile.controller";

const {checkSchema} = require('express-validator');

export const ProfileRoute = Router()

ProfileRoute.route("/")
	.get(getAllProfilesController)

ProfileRoute.route("/:profileId")
	.get(getProfileByProfileIdController)
	.put(asyncValidatorController(checkSchema(profileValidator)), putProfileController)

ProfileRoute.route("/profileEmail")
	.post(getProfileByProfileEmailController)

ProfileRoute.route("/profileActivation/:profileActivationToken")
	.get(getProfileByProfileActivationTokenController)