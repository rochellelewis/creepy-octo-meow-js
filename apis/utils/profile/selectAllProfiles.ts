import {connect} from "../../src/database";

/**
 * Gets all profiles from mySQL
 *
 * @return {(Array | undefined)} rows - array that contains the post data found, or undefined if errors occur
 **/
export async function selectAllProfiles() {
	try {

		const mysqlConnection = await connect();

		const mySqlQuery = 'SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken, profileEmail, profileHash, profileUsername FROM profile'

		const [rows] =  await mysqlConnection.execute(mySqlQuery)
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}