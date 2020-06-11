import {Router} from "express";
import {
	getProfileByProfileActivationTokenController,
	getProfileByProfileIdController,
	postProfileController,
	updateProfileController
} from "../controllers/profile.controller";

export const ProfileRoute = Router()

ProfileRoute.route("/")
	// .get((req, res) => res.json("Is this thing on?"))
	.post(postProfileController)

ProfileRoute.route("/:profileId")
	.get(getProfileByProfileIdController)
	.put(updateProfileController)

ProfileRoute.route("/:profileActivationToken")
	.get(getProfileByProfileActivationTokenController)