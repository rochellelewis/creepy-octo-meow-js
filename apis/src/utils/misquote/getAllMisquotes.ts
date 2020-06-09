import {connect} from "../../database";
import {Misquote} from "../interfaces/misquote";

/**
 * Helper function that grabs all misquotes
 **/
export async function getAllMisquotes() {
	try {
		const mysqlConnection = await connect()

		const mySqlQuery = "SELECT BIN_TO_UUID(misquoteId) AS misquoteId, misquoteAttribution, misquoteContent, misquoteSubmitter FROM misquote";

		const [rows] = await mysqlConnection.execute(mySqlQuery)
		return rows

	} catch (error) {
		console.log(error)
		return undefined
	}
}