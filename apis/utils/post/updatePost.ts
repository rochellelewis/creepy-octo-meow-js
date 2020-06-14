import {Post} from "../interfaces/post";
import {connect} from "../../src/database";

/**
 * Updates an existing post
 *
 * @param {Post} post to be updated
 **/
export async function updatePost(post: Post) {
	try {

		const mySqlConnection = await connect();

		// only set/update the proper data! (NEVER update primary keys, etc.)
		const mySqlQuery = "UPDATE post SET postContent = :postContent, postDate = :postDate, postTitle = :postTitle WHERE postId = UUID_TO_BIN(:postId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, post)
		return "Meow updated successfully! :D"

	} catch(error) {
		console.log(error)
	}
}