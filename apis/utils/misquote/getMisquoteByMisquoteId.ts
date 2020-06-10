import {Misquote} from "../interfaces/misquote";
import {connect} from "../../src/database";

async function getMisquoteByMisquoteId(misquoteId : string) {
	try {
		// connect to DB. This is an async operation.
		const mysqlConnection = await connect();

		// mysql prepared statement
		const mySqlQuery = 'SELECT BIN_TO_UUID(misquoteId) as misquoteId, misquoteAttribution, misquoteContent, misquoteSubmitter FROM misquote WHERE misquoteId = UUID_TO_BIN(:misquoteId)'

		// return the rows from DB
		const [rows] =  await mysqlConnection.execute(mySqlQuery, misquoteId)
		return rows

	} catch (error) {
		console.log(error)
		return undefined
	}
}