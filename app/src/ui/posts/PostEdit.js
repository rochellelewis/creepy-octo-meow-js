import React, { useState } from 'react'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PostEdit = (props) => {

	// this is the post passed in via props
	const {post} = props;

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button onClick={handleShow} variant="outline-secondary" size="sm" className="mr-2">
				<FontAwesomeIcon icon="pencil-alt"/>
			</Button>

			{/* Modal Window / Edit Post Form */}
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Editing Post #{post.postId}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>{post.postTitle}</h5>
					<p>{post.postContent}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
};