import {connect} from "../../src/database";
import {Profile} from "../interfaces/profile";

/**
 * Deletes an existing profile. Upon deletion, all posts and likes associated with the profileId will cascade delete.
 *
 * @see sql/creepy-octo-meow.sql
 *
 * @param {Profile} profile to be deleted
 **/
export async function deleteProfile(profile: Profile) {
	try {

		const mySqlConnection = await connect();
		const mySqlQuery = "DELETE from profile WHERE profileId = UUID_TO_BIN(:profileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, profile)
		return "Profile deleted successfully! :'("

	} catch(error) {
		console.log(error)
		return JSON.stringify(error)
	}
}