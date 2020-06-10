import {Like} from "../interfaces/like";
import {connect} from "../../database";

/**
 * Deletes a like mySQL
 *
 * @param {Like} like object to be deleted from mysql
 **/
export async function deleteLike(like: Like) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "DELETE FROM `like` WHERE likePostId = UUID_TO_BIN(:likePostId) AND likeProfileId = UUID_TO_BIN(:likeProfileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, like)
		return "Like deleted successfully! :|"

	} catch(error) {
		console.log(error)
	}
}