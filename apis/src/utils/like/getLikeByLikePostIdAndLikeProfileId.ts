import {Like} from "../interfaces/like";
import {connect} from "../../database";

export async function getLikeByLikePostIdAndLikeProfileId(likePostId: string, likeProfileId: string) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "SELECT likePostId, likeProfileId FROM `like` WHERE likePostId = UUID_TO_BIN(:likePostId) AND likeProfileId = UUID_TO_BIN(:likeProfileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, [likePostId, likeProfileId])
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}