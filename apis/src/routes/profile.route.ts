import {Router} from "express";
//import {getAllMisquoteController, insertMisquoteController} from "../controllers/misquote.controller";

export const ProfileRoute = Router()

ProfileRoute.route("/")
	.get((req, res) => res.json("Is this thing on?"))
	// .post((req, res) => res.json())