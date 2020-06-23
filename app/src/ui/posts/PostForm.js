import React, {useState} from "react";
import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import {PostFormContent} from "./PostFormContent";
import { UseJwt } from '../../utils/jwt-helpers'
// import {handleSessionTimeout} from "../../shared/misc/handle-session-timeout";

export const PostForm = () => {

	const [status, setStatus] = useState(null);

	const jwt = UseJwt();

	const post = {
		postTitle: "",
		postContent: ""
	};

	const validator = Yup.object().shape({
		postTitle: Yup.string()
			.required("A title is required.")
			.max(64, "No titles longer than 64 characters."),
		postContent: Yup.string()
			.required("U gonna post something?")
			.max(2000, "2000 characters max per meow.")
	});

	const submitPost = (values, {resetForm, setStatus}) => {
		// grab jwt token to pass in headers on post request
		const headers = {'authorization': jwt};

		httpConfig.post("/apis/post/", values, {
			headers: headers})
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});
				if(reply.status === 200) {
					resetForm();
					setStatus({message, type});
					/*TODO: find a better way to re-render the post component!*/
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				}
				// if there's an issue with a $_SESSION mismatch with xsrf or jwt, alert user and do a sign out
				if(reply.status === 401) {
					// handleSessionTimeout();
				}
			});
	};

	return (
		<>
			<Formik
				initialValues={post}
				onSubmit={submitPost}
				validationSchema={validator}
			>
				{PostFormContent}
			</Formik>
		</>
	)
};