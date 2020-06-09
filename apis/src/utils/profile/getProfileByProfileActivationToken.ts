import {Profile} from "../interfaces/profile";
import {connect} from "../../database";

async function getProfileByProfileActivationToken(profileActivationToken : string) {
	try {

		const mysqlConnection = await connect();

		const mySqlQuery = 'SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken, profileEmail, profileHash, profileUsername FROM profile WHERE profileActivationToken = :profileActivationToken'

		const [rows] =  await mysqlConnection.execute(mySqlQuery, profileActivationToken)
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}