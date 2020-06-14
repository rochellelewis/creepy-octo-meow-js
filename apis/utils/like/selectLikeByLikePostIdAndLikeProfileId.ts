import {connect} from "../../src/database";

/**
 * Gets a like by post id and profile id.
 *
 * @param {string} likePostId - the id of the post that has been liked
 * @param {string} likeProfileId - the id of the profile that liked the post
 * @return {(Array | undefined)} rows - array that contains the like data found, or undefined if errors occur
 **/
export async function selectLikeByLikePostIdAndLikeProfileId(likePostId: string, likeProfileId: string) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "SELECT BIN_TO_UUID(likePostId) as likePostId, BIN_TO_UUID(likeProfileId) as likeProfileId FROM `like` WHERE likePostId = UUID_TO_BIN(:likePostId) AND likeProfileId = UUID_TO_BIN(:likeProfileId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, {likePostId, likeProfileId})
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}