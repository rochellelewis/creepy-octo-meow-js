import React, {useState} from 'react';
import {Redirect} from "react-router";
import {useDispatch} from 'react-redux'
import * as Yup from "yup";
import {Formik} from "formik";

import {httpConfig} from "../../utils/http-config";

// this is the form itself - separated into it's own component for simplicity
import {SignInFormContent} from "./SignInFormContent";

export const SignInForm = () => {

  // state variable to handle redirect to posts page on sign in
  //const [toPosts, setToPosts] = useState(null);

  const dispatch = useDispatch()

  // form validation
  const validator = Yup.object().shape({
    signinEmail: Yup.string()
      .email("email must be a valid email")
      .required('email is required'),
    signinPassword: Yup.string()
      .required("Password is required")
  });

  // state variable to hold form data
  const signIn = {
    signinEmail: "",
    signinPassword: ""
  };

  // sign in form POST submitter
  const submitSignIn = (values, {resetForm, setStatus}) => {
    httpConfig.post("/apis/signin/", values)
      .then(reply => {
        let {message, type} = reply;
        if(reply.status === 200 && reply.headers["authorization"]) {
          window.localStorage.removeItem("jwt");
          window.localStorage.setItem("jwt", reply.headers["authorization"]);
          resetForm();
          setTimeout(() => {
            // setToPosts(true);
            window.location = "/posts";
          }, 750);
        }
        setStatus({message, type});
      });
  };

  return (
    <>
      {/* redirect user to posts page on sign in */}
      {/*{toPosts ? <Redirect to="/posts" /> : null}*/}

      <Formik
        initialValues={signIn}
        onSubmit={submitSignIn}
        validationSchema={validator}
      >
        {SignInFormContent}
      </Formik>
    </>
  )
};