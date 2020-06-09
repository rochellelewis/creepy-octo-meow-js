import {Post} from "../interfaces/post";
import {connect} from "../../database";

export async function updatePost(post: Post) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "UPDATE post SET postProfileId = UUID_TO_BIN(:postProfileId), postContent = :postContent, postDate = :postDate, postTitle = :postTitle WHERE postId = UUID_TO_BIN(:postId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, post)
		return "Meow updated successfully! :D"

	} catch(error) {
		console.log(error)
	}
}