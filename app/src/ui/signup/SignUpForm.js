import React, {useState} from "react";
import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import {SignUpFormContent} from "./SignUpFormContent";

export const SignUpForm = () => {

	const [status, setStatus] = useState(null);

	const signUp = {
		signupEmail: "",
		signupUsername: "",
		signupPassword: "",
		signupPasswordConfirm: ""
	};

	const validator = Yup.object().shape({
		signupEmail: Yup.string()
			.email("Please provide a valid email")
			.required("Email is required"),
		signupUsername: Yup.string()
			.required("Username is required")
			.min(2, "Username must be at least 2 characters"),
		signupPassword: Yup.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters"),
		signupPasswordConfirm: Yup.string()
			.required("Confirm your password")
	});

	const submitSignUp = (values, {resetForm, setStatus}) => {
		httpConfig.post("/apis/signup/", values)
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});
				if(reply.status === 200) {
					resetForm();
					setStatus({message, type});
				}
			});
	};

	return (
		<>
			<Formik
				initialValues={signUp}
				onSubmit={submitSignUp}
				validationSchema={validator}
			>
				{SignUpFormContent}
			</Formik>
		</>
	)

};