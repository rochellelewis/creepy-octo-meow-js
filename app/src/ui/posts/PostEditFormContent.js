import React from "react";

import {FormDebugger} from "../shared/components/FormDebugger";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const PostEditFormContent = (props) => {

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
          <Form.Label className="sr-only">Post Title</Form.Label>
          <InputGroup>
            <FormControl
              id="postTitle"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Update Post Title"
              type="text"
              value={values.postTitle}
            />
          </InputGroup>
          {
            errors.postTitle && touched.postTitle && (
              <div className="alert alert-danger">
                {errors.postTitle}
              </div>
            )
          }
        </Form.Group>

        <Form.Group>
          <Form.Label className="sr-only">Post Content</Form.Label>
          <InputGroup>
            <FormControl
              id="postContent"
              as="textarea"
              rows="8"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Update Post Content"
              value={values.postContent}
            />
          </InputGroup>
          {
            errors.postContent && touched.postContent && (
              <div className="alert alert-danger">
                {errors.postContent}
              </div>
            )
          }
        </Form.Group>

        <Form.Group>
          <Button variant="dark" type="submit" className="mr-2">Meow!</Button>
          <Button variant="outline-dark" type="reset" onClick={handleReset}>Reset</Button>
        </Form.Group>

        {/*for testing purposes only*/}
        {/*<FormDebugger {...props}/>*/}

      </Form>

      {console.log(status)}
      {status && (<div className={status.type}>{status.message}</div>)}
    </>
  )
};