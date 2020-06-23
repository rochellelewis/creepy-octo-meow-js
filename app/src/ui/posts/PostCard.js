import React from "react";
import {httpConfig} from "../../utils/http-config";

import {UseJwt, UseJwtProfileId} from "../../utils/jwt-helpers";
// import {handleSessionTimeout} from "../../shared/misc/handle-session-timeout";

import {Like} from "../Like";
import {PostEdit} from "./PostEdit";
import {PostUsername} from "./PostUsername";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PostCard = ({post}) => {

	// grab jwt and jwt profile id of logged in users
	const jwt = UseJwt();
	const profileId = UseJwtProfileId();

	const deletePost = () => {
		const headers = {'X-JWT-TOKEN': jwt};
		const params = {id: post.postId};
		let confirm = window.confirm("Are you sure u wanna delete this?");
		if(confirm){
			httpConfig.delete("/apis/post/", {
				headers, params})
				.then(reply => {
					let {message, type} = reply;
					if(reply.status === 200) {
						// TODO: fix this janky ass sh*t pls :poop:
						window.location.reload();
					}
					// if there's an issue with a $_SESSION mismatch with xsrf or jwt, alert user and do a sign out
					if(reply.status === 401) {
						// handleSessionTimeout();
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
							<h3 className="panel-title my-0">{post.postTitle}</h3>
						</Card.Header>
						<Card.Body>
							<div className="d-flex justify-content-end">
								<div className="d-inline-block small text-muted mr-auto my-auto">
									<h6 className="d-sm-inline-block">
										<Badge className="p-1 mr-2" variant="secondary">By:&nbsp;
											<PostUsername profileId={post.postProfileId} />
										</Badge>
									</h6>
									{formatDate.format(post.postDate)}
								</div>

								{/* conditional render del & edit buttons if logged into account that created them! */}
								{(profileId === post.postProfileId) && (
									<>
										<Button onClick={deletePost} variant="outline-secondary" size="sm" className="mr-2">
											<FontAwesomeIcon icon="trash-alt"/>
										</Button>

										<PostEdit postId={post.postId}/>
									</>
								)}

								<Like profileId={profileId} postId={post.postId}/>

							</div>
							<hr />
							<Card.Text>{post.postContent}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
		</>
	)
};