
import {Router} from "express";
import {getAllMisquoteController, insertMisquoteController} from "../controllers/misquote.controller";

export const MisquoteRoute = Router()

MisquoteRoute.route("/")
	.get(getAllMisquoteController)
	.post(insertMisquoteController)