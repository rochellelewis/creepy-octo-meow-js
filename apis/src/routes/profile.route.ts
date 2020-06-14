import {Router} from "express";
import {
	getProfileByProfileActivationTokenController,
	getProfileByProfileIdController,
	putProfileController,
	getAllProfilesController,
	getProfileByProfileEmailController
} from "../controllers/profile.controller";

export const ProfileRoute = Router()

ProfileRoute.route("/")
	// .get((req, res) => res.json("Profile: Is this thing on?"))
	.get(getAllProfilesController)

ProfileRoute.route("/:profileId")
	.get(getProfileByProfileIdController)
	.put(putProfileController)

ProfileRoute.route("/profileEmail/:profileEmail")
	.get(getProfileByProfileEmailController)

ProfileRoute.route("/profileActivation/:profileActivationToken")
	.get(getProfileByProfileActivationTokenController)