import {Router} from "express";
import {
	getProfileByProfileActivationTokenController,
	getProfileByProfileIdController,
	postProfileController,
	putProfileController,
	getAllProfilesController
} from "../controllers/profile.controller";

export const ProfileRoute = Router()

ProfileRoute.route("/")
	// .get((req, res) => res.json("Profile: Is this thing on?"))
	.get(getAllProfilesController)
	.post(postProfileController)

ProfileRoute.route("/:profileId")
	.get(getProfileByProfileIdController)
	.put(putProfileController)

// ProfileRoute.route("/profileActivation/:profileActivationToken")
// 	.get(getProfileByProfileActivationTokenController)