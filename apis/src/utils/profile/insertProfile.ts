import {Profile} from "../interfaces/profile";
import {connect} from "../../database";

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