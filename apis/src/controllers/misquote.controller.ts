import {NextFunction, Request, Response} from "express";
import {Status} from "../utils/interfaces/status";
import {getAllMisquotes} from "../utils/misquote/getAllMisquotes";
import {Misquote} from "../utils/interfaces/misquote";
import {insertMisquote} from "../utils/misquote/insertMisquote";


export async function getAllMisquoteController(request: Request, response: Response, nextFunction: NextFunction) {
	try {
		const data = await getAllMisquotes()
		console.log(data)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)
	} catch (error) {
		console.log(error)
	}
}

export async function insertMisquoteController(request: Request, response: Response, nextFunction: NextFunction) {
	const {misquoteAttribution, misquoteContent, misquoteSubmitter} = request.body
	const misquote : Misquote = {misquoteId: null, misquoteAttribution, misquoteContent, misquoteSubmitter}
	const result = await insertMisquote(misquote)
	return response.json({status: 200, data: null, message: result })
}