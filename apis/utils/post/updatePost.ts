import {Post} from "../interfaces/post";
import {connect} from "../../src/database";

/**
 * Updates an existing post
 *
 * @param {string} postId - id of the post to be updated
 **/
export async function updatePost(postId: string) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "UPDATE post SET postProfileId = UUID_TO_BIN(:postProfileId), postContent = :postContent, postDate = :postDate, postTitle = :postTitle WHERE postId = UUID_TO_BIN(:postId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, postId)
		return "Meow updated successfully! :D"

	} catch(error) {
		console.log(error)
	}
}