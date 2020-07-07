import React from "react";

import {FormDebugger} from "../../ui/shared/components/FormDebugger";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SignUpFormContent = (props) => {

	const {
		status,
		values,
		errors,
		touched,
		dirty,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset
	} = props;

	return (
		<>
			<Form onSubmit={handleSubmit}>

				<Form.Group>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text>
								<FontAwesomeIcon icon="user"/>
							</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="signupUsername"
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Pick a User Name"
							type="text"
							value={values.signupUsername}
						/>
					</InputGroup>
					{
						errors.signupUsername && touched.signupUsername && (
							<div className="alert alert-danger">
								{errors.signupUsername}
							</div>
						)
					}
				</Form.Group>

				<Form.Group>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text>
								<FontAwesomeIcon icon="envelope"/>
							</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="signupEmail"
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Your Email"
							type="email"
							value={values.signupEmail}
						/>
					</InputGroup>
					{
						errors.signupEmail && touched.signupEmail && (
							<div className="alert alert-danger">
								{errors.signupEmail}
							</div>
						)
					}
				</Form.Group>

				<Form.Group>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text>
								<FontAwesomeIcon icon="key"/>
							</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="signupPassword"
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Password"
							type="password"
							value={values.signupPassword}
						/>
					</InputGroup>
					{
						errors.signupPassword && touched.signupPassword && (
							<div className="alert alert-danger">
								{errors.signupPassword}
							</div>
						)
					}
				</Form.Group>

				<Form.Group>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text>
								<FontAwesomeIcon icon="ellipsis-h"/>
							</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="signupPasswordConfirm"
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Confirm Password"
							type="password"
							value={values.signupPasswordConfirm}
						/>
					</InputGroup>
					{
						errors.signupPasswordConfirm && touched.signupPasswordConfirm && (
							<div className="alert alert-danger">
								{errors.signupPasswordConfirm}
							</div>
						)
					}
				</Form.Group>

				<Form.Group className="text-md-right">
					<Button variant="primary" type="submit">
						<FontAwesomeIcon icon="paw"/>&nbsp;Join Us!
					</Button>
				</Form.Group>

			</Form>

			{/*{console.log(status)}*/}
			{status && (<div className={status.type}>{status.message}</div>)}

			{/*for testing purposes only*/}
			{/*<FormDebugger {...props}/>*/}
		</>
	)
};