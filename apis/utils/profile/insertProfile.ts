import {connect} from "../../src/database";
import {Profile} from "../interfaces/profile";

export async function insertProfile(profile: Profile) {
	try {

		const mysqlConnection = await connect();
		const query : string = "INSERT INTO profile(profileId, profileActivationToken, profileEmail, profileHash, profileUsername) VALUES(UUID_TO_BIN(UUID()), :profileActivationToken, :profileEmail, :profileHash, :profileUsername)";

		const [rows] = await mysqlConnection.execute(query, profile);
		return 'Profile Successfully Created'

	} catch (e) {
		console.error(e)
		return null
	}
}