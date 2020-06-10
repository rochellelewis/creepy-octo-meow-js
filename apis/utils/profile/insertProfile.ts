import {Profile} from "../interfaces/profile";
import {connect} from "../../src/database";

/**
 * Inserts a profile into mysql
 *
 * @param {Profile} profile to insert into mysql
 **/
export async function insertProfile(profile: Profile) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "INSERT INTO profile(profileId, profileActivationToken, profileEmail, profileHash, profileUsername) VALUES(UUID_TO_BIN(UUID()), :profileActivationToken, :profileEmail, :profileHash, :profileUsername)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, profile)
		return "Profile created successfully! :D"

	} catch(error) {
		console.log(error)
	}
}