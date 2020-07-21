import React, {useState} from "react";
import { useDispatch } from 'react-redux'
import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

// rlewis helpers :D
import { UseJwt } from '../../utils/jwt-helpers'
import { handleSessionTimeout } from '../../utils/session-timeout'

import {fetchAllPostsAndProfiles} from '../../store/posts'
import {PostFormContent} from "./PostFormContent";

export const PostForm = () => {

	const [status, setStatus] = useState(null);
	const dispatch = useDispatch()

	// grab json web token
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
			.max(300, "300 characters max per meow.")
	});

	const submitPost = (values, {resetForm, setStatus}) => {
		// grab jwt token to pass in headers on post request
		const headers = {'authorization': jwt};
		httpConfig.post("/apis/post/", values, {
			headers: headers})
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});

				// if successful
				if(reply.status === 200) {
					resetForm();
					dispatch(fetchAllPostsAndProfiles())
					setTimeout(() => {
						// todo: close mobile post form modal window here
					}, 750)
				}

				// if isLoggedIn.controller returns a 400, alert user and do a log out
				if(reply.status === 400) {
					handleSessionTimeout()
				}

				setStatus({message, type});
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