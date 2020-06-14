import {connect} from "../../src/database";

/**
 * Gets a profile by profile id
 *
 * @param {string} profileId - id of the profile to select from mysql
 * @return {(Array | undefined)} rows - array that contains the profile data found, or undefined if errors occur
 **/
export async function selectProfileByProfileId(profileId : string) {
	try {

		const mysqlConnection = await connect();

		// mysql prepared statement
		const mySqlQuery = 'SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken, profileEmail, profileHash, profileUsername FROM profile WHERE profileId = UUID_TO_BIN(:profileId)'

		// return the rows from DB
		const [rows] =  await mysqlConnection.execute(mySqlQuery, {profileId})
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}