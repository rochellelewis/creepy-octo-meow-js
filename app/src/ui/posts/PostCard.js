import React from "react";
import { useDispatch } from 'react-redux'

import {httpConfig} from "../../utils/http-config";
import {UseJwt, UseJwtProfileId} from "../../utils/jwt-helpers";
import { DecodeCharacters } from '../../utils/decode-characters';
// import {handleSessionTimeout} from "../../shared/misc/handle-session-timeout";

import {Like} from "../Like";
import {PostEdit} from "./PostEdit";
import {PostUsername} from "./PostUsername";

import {fetchAllPostsAndProfiles} from '../../store/posts'

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux'

export const PostCard = ({post}) => {

	// grab jwt and jwt profile id of logged in users
	const jwt = UseJwt();
	const profileId = UseJwtProfileId();

	const dispatch = useDispatch()

	/**
	 * Handles the DELETE request to delete a post
	 **/
	const deletePost = () => {
		const headers = {'authorization': jwt};
		let confirm = window.confirm("Are you sure u wanna delete this?");
		if(confirm){
			httpConfig.delete(`/apis/post/${post.postId}`, {
				headers})
				.then(reply => {
					let {message, type} = reply;
					if(reply.status === 200) {
						dispatch(fetchAllPostsAndProfiles())
					} else {
						window.confirm(message)
					}
				});
		}
	};

	// TODO: date formatting should ideally be a utility / helper function
	// set your preferred date format options here
	const formatDateOptions = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: '2-digit',
		timeZoneName: 'short'
	});

	// format the post date
	const formattedDate = formatDateOptions.format(Date.parse(post.postDate))

	return (
		<>
				<Col xl={6}>
					<Card className="mb-3 bg-dark-50 border text-light">
						<Card.Header>
							{/*<h3 className="panel-title my-0" dangerouslySetInnerHTML={{ __html: post.postTitle }}/>*/}
							<h3 className="panel-title my-0">{DecodeCharacters(post.postTitle)}
							</h3>
						</Card.Header>
						<Card.Body className="border-bottom">
							<div className="d-flex align-items-center">
								<div className="flex-grow-1">
									<Badge className="p-2 mr-2" variant="dark">By:&nbsp;
										<PostUsername profileId={post.postProfileId} />
									</Badge>
								</div>

								{/* conditional render del & edit buttons if logged into account that created them! */}
								{(profileId === post.postProfileId) && (
									<>
										<Button onClick={deletePost} variant="outline-secondary" size="sm" className="mr-2">
											<FontAwesomeIcon icon="trash-alt"/>
										</Button>
										<PostEdit post={post}/>
									</>
								)}

								{/* like button! <3 */}
								<Like profileId={profileId} postId={post.postId}/>

							</div>
						</Card.Body>
						<Card.Body>
							{/*<Card.Text dangerouslySetInnerHTML={{ __html: post.postContent }}/>*/}
							<Card.Text>{DecodeCharacters(post.postContent)}</Card.Text>
						</Card.Body>
						<Card.Footer className="py-1">
							<span className="small text-muted font-italic">{formattedDate}</span>
						</Card.Footer>
					</Card>
				</Col>
		</>
	)
};