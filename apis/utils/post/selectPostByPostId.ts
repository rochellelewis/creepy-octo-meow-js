import {connect} from "../../src/database";
import {Post} from "../interfaces/post";

/**
 * Gets a post from mySQL by post id
 *
 * @param {string} postId - id of the post to be retrieved from mySQL
 * @return {(Array | undefined)} rows - array that contains the post data found, or undefined if errors occur
 **/
export async function selectPostByPostId(postId : string) : Promise<Post|undefined> {
	try {

		const mysqlConnection = await connect();

		// mysql prepared statement
		const mySqlQuery = 'SELECT BIN_TO_UUID(postId) as postId, BIN_TO_UUID(postProfileId) as postProfileId, postContent, postDate, postTitle FROM post WHERE postId = UUID_TO_BIN(:postId)'

		// return the rows from DB
		//const [rows] =  await mysqlConnection.execute(mySqlQuery, postId)
		//return rows

		const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(postId) as postId, BIN_TO_UUID(postProfileId) as postProfileId, postContent, postDate, postTitle FROM post WHERE postId = UUID_TO_BIN(:postId)', {postId})

		// @ts-ignore is required so that rows can be interacted with like the array it is
		return rows.length !== 0 ? {...rows[0]} : undefined;

	} catch(error) {
		console.log(error)
		return undefined
	}
}