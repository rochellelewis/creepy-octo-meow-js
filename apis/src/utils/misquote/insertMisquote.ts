import {Misquote} from "../interfaces/misquote";
import {connect} from "../../database";

export async function insertMisquote(misquote: Misquote) {
	try {

		const mySqlConnection = await connect()

		const mySqlQuery = "INSERT INTO misquote(misquoteId, misquoteAttribution, misquoteContent, misquoteSubmitter) VALUES(UUID_TO_BIN(UUID()), :misquoteAttribution, :misquoteContent, :misquoteSubmitter)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, misquote)
		return "Misquote created successfully"

	} catch (error) {
		console.log(error)
	}
}