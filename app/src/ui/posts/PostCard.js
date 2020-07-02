import React from "react";
import { useDispatch } from 'react-redux'

import {httpConfig} from "../../utils/http-config";
import {UseJwt, UseJwtProfileId} from "../../utils/jwt-helpers";
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

	const formatDate = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'numeric',
		year: '2-digit',
		hour: 'numeric',
		minute: 'numeric',
		second: '2-digit',
		timeZoneName: 'short'
	});

	return (
		<>
				<Col xl={6}>
					<Card className="mb-3 bg-transparent-90">
						<Card.Header>
							{/* TODO: is there a better way around JSX double escaping/encoding??? */}
							<h3 className="panel-title my-0" dangerouslySetInnerHTML={{ __html: post.postTitle }}/>
						</Card.Header>
						<Card.Body>
							<div className="d-flex justify-content-end">
								<div className="d-inline-block small text-muted mr-auto my-auto">
									<h6 className="d-sm-inline-block">
										<Badge className="p-1 mr-2" variant="secondary">By:&nbsp;
											<PostUsername profileId={post.postProfileId} />
										</Badge>
									</h6>
									{/* TODO: format date properly */}
									{/*{formatDate.format(post.postDate)}*/}
									{post.postDate}
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

								<Like profileId={profileId} postId={post.postId}/>

							</div>
							<hr />
							{/* TODO: is there a better way around JSX double escaping/encoding??? */}
							<Card.Text dangerouslySetInnerHTML={{ __html: post.postContent }}/>
						</Card.Body>
					</Card>
				</Col>
		</>
	)
};