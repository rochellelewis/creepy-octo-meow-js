import React from "react";

import {FormDebugger} from "../shared/components/FormDebugger";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ProfileEditFormContent = (props) => {

  const {
    submitStatus,
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
              id="profileUsername"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="New User Name"
              type="text"
              value={values.profileUsername}
            />
          </InputGroup>
          {
            errors.profileUsername && touched.profileUsername && (
              <div className="alert alert-danger">
                {errors.profileUsername}
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
              id="profileEmail"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="New Email"
              type="email"
              value={values.profileEmail}
            />
          </InputGroup>
          {
            errors.profileEmail && touched.profileEmail && (
              <div className="alert alert-danger">
                {errors.profileEmail}
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
              id="profilePassword"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter New or Current Password"
              type="password"
              value={values.profilePassword}
            />
          </InputGroup>
          {
            errors.profilePassword && touched.profilePassword && (
              <div className="alert alert-danger">
                {errors.profilePassword}
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
              id="profilePasswordConfirm"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm New or Current Password"
              type="password"
              value={values.profilePasswordConfirm}
            />
          </InputGroup>
          {
            errors.profilePasswordConfirm && touched.profilePasswordConfirm && (
              <div className="alert alert-danger">
                {errors.profilePasswordConfirm}
              </div>
            )
          }
        </Form.Group>

        <Form.Group>
          <Button variant="dark" type="submit" className="mr-2">
            <FontAwesomeIcon icon="paw"/>&nbsp;Update!
          </Button>
          <Button variant="outline-dark" type="reset" onClick={handleReset}>Reset</Button>
        </Form.Group>
      </Form>

      {/*{console.log(status)}*/}
      {status && (<div className={status.type}>{status.message}</div>)}

      {/*for testing purposes only*/}
      {/*<FormDebugger {...props}/>*/}
    </>
  )
};