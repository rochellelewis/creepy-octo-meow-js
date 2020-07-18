import {connect} from "../../src/database";
import {Profile} from "../interfaces/profile";

/**
 * Updates an existing profile. This method does not update the
 * profileActivationToken for account activation, but only allows
 * a user to update their relevant account fields.
 *
 * @param {Profile} profile to be updated
 **/
export async function updateProfile(profile: Profile) {
	try {

		const mySqlConnection = await connect();
		const mySqlQuery = "UPDATE profile SET profileEmail = :profileEmail, profileHash = :profileHash, profileUsername = :profileUsername WHERE profileId = UUID_TO_BIN(:profileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, profile)
		return "Profile updated successfully! :D"

	} catch(error) {
		console.log(error)
	}
}

/**
 * Activates a new user profile by setting the activation
 * token to null after sign up. This method only updates
 * the profileActivationToken value.
 *
 * @param {Profile} profile to be updated
 **/
export async function activateProfile(profile: Profile) {
	try {

		const mySqlConnection = await connect();
		const mySqlQuery = "UPDATE profile SET profileActivationToken = null WHERE profileId = UUID_TO_BIN(:profileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, profile)
		return "Profile activated successfully! :D"

	} catch(error) {
		console.log(error)
	}
}