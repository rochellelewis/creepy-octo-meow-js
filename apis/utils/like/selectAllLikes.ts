import {connect} from "../../src/database";

/**
 * Gets all likes from mySQL - for testing purposes only
 *
 * @return {(Array | undefined)} rows - array that contains the post data found, or undefined if errors occur
 **/
export async function selectAllLikes() {
	try {

		const mysqlConnection = await connect();

		const mySqlQuery = 'SELECT BIN_TO_UUID(likePostId) as likePostId, BIN_TO_UUID(likeProfileId) as likeProfileId FROM `like`'

		const [rows] =  await mysqlConnection.execute(mySqlQuery)
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}