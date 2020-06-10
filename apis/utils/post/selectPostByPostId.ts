import {connect} from "../../src/database";

/**
 * Gets a post from mySQL by post id
 *
 * @param {string} postId - id of the post to be retrieved from mySQL
 * @return {(Array | undefined)} rows - array that contains the post data found, or undefined if errors occur
 **/
async function selectPostByPostId(postId : string) {
	try {

		const mysqlConnection = await connect();

		// mysql prepared statement
		const mySqlQuery = 'SELECT BIN_TO_UUID(postId) as postId, BIN_TO_UUID(postProfileId) as postProfileId, postContent, postDate, postTitle FROM post WHERE postId = UUID_TO_BIN(:postId)'

		// return the rows from DB
		const [rows] =  await mysqlConnection.execute(mySqlQuery, postId)
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}