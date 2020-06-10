import {Like} from "../interfaces/like";
import {connect} from "../../src/database";

/**
 * Deletes a like mySQL
 *
 * @param {string} likePostId - post id of the like to be deleted
 * @param {string} likeProfileId - profile id that created the like to be deleted
 **/
export async function deleteLike(likePostId: string, likeProfileId: string) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "DELETE FROM `like` WHERE likePostId = UUID_TO_BIN(:likePostId) AND likeProfileId = UUID_TO_BIN(:likeProfileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, [likePostId, likeProfileId])
		return "Like deleted successfully! :|"

	} catch(error) {
		console.log(error)
	}
}