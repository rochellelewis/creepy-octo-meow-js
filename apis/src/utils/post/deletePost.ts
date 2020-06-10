import {Post} from "../interfaces/post";
import {connect} from "../../database";

/**
 * Deletes a post from mySQL
 *
 * @param {string} postId - id of the post to be deleted
 **/
export async function deletePost(postId: string) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "DELETE FROM post WHERE postId = UUID_TO_BIN(:postId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, postId)
		return "Meow deleted successfully! :("

	} catch(error) {
		console.log(error)
	}
}