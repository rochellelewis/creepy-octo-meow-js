import {connect} from "../../src/database";

/**
 * Gets a profile by activation token from mySQL
 *
 * @param {(string | null)} profileActivationToken - activation token of profile to select from mySQL
 * @return {(Array | undefined)} rows - array that contains the profile data found, or undefined if errors occur
 **/
export async function selectProfileByProfileActivationToken(profileActivationToken : string | null) {
	try {

		const mysqlConnection = await connect();

		const mySqlQuery = 'SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken, profileEmail, profileHash, profileUsername FROM profile WHERE profileActivationToken = :profileActivationToken'

		const [rows] =  await mysqlConnection.execute(mySqlQuery, {profileActivationToken})
		// return rows

		// @ts-ignore is required so that rows can be interacted with like the array it is
		return rows.length !== 0 ? {...rows[0]} : undefined;

	} catch(error) {
		console.log(error)
		return undefined
	}
}