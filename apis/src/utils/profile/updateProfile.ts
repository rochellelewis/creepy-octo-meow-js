import {Profile} from "../interfaces/profile";
import {connect} from "../../database";

/**
 * Updates an existing profile
 *
 * @param {Profile} profile to be updated
 **/
export async function updateProfile(profile: Profile) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "UPDATE profile SET profileActivationToken = :profileActivationToken, profileEmail = :profileEmail, profileHash = :profileHash, profileUsername = :profileUsername WHERE profileId = UUID_TO_BIN(:profileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, profile)
		return "Profile updated successfully! :D"

	} catch(error) {
		console.log(error)
	}
}