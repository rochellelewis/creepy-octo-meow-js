
import {Router} from "express";
import {getAllMisquoteController, insertMisquoteController} from "../controllers/misquote.contoller";

export const MisquoteRoute = Router()

MisquoteRoute.route("/")
	.get(getAllMisquoteController)
	.post(insertMisquoteController)