import {Like} from "../interfaces/like";
import {connect} from "../../database";

export async function getLikesByLikePostId(likePostId: string) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "SELECT BIN_TO_UUID(likePostId) as likePostId, BIN_TO_UUID(likeProfileId) as likeProfileId FROM `like` WHERE likePostId = UUID_TO_BIN(:likePostId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, likePostId)
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}