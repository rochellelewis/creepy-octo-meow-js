import {Post} from "../interfaces/post";
import {connect} from "../../database";

export async function insertPost(post: Post) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "INSERT INTO post(postId, postProfileId, postContent, postDate, postTitle) VALUES(UUID_TO_BIN(UUID()), UUID_TO_BIN(:postProfileId), :postContent, :postDate, :postTitle)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, post)
		return "Meow created successfully! :D"

	} catch(error) {
		console.log(error)
	}
}