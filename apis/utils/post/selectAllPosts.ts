import {connect} from "../../src/database";

/**
 * Gets all posts from mySQL
 *
 * @return {(Array | undefined)} rows - array that contains the post data found, or undefined if errors occur
 **/
export async function selectAllPosts() {
	try {

		const mysqlConnection = await connect();

		const mySqlQuery = 'SELECT BIN_TO_UUID(postId) as postId, BIN_TO_UUID(postProfileId) as postProfileId, postContent, postDate, postTitle FROM post ORDER BY postDate DESC'

		const [rows] =  await mysqlConnection.execute(mySqlQuery)
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}