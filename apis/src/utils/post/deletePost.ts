import {Post} from "../interfaces/post";
import {connect} from "../../database";

export async function deletePost(post: Post) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "DELETE FROM post WHERE postId = UUID_TO_BIN(:postId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, post)
		return "Meow deleted successfully! :("

	} catch(error) {
		console.log(error)
	}
}