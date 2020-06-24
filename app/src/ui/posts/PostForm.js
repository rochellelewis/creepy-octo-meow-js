import React, {useState} from "react";
import { useDispatch } from 'react-redux'

import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import {fetchAllPostsAndProfiles} from '../../store/posts'
import {PostFormContent} from "./PostFormContent";
import { UseJwt } from '../../utils/jwt-helpers'
// import {handleSessionTimeout} from "../../shared/misc/handle-session-timeout";

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
					dispatch(fetchAllPostsAndProfiles())
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