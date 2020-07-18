import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import { UseJwt } from '../../utils/jwt-helpers'
import { handleSessionTimeout } from '../../utils/session-timeout'
import { fetchProfileByProfileId } from '../../store/profiles'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { ProfileEditFormContent } from './ProfileEditFormContent'

export const ProfileEdit = (props) => {

  // this is the profile passed in via props
  const {profile} = props;

  // controls show/hide modal window
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [status, setStatus] = useState(null);
  const dispatch = useDispatch()

  // grab json web token
  const jwt = UseJwt();

  /*
	* Set initial values to the existing profile data
	* */
  const updatedProfileContent = {
    profileEmail: profile.profileEmail,
    profilePassword: "",
    profileUsername: profile.profileUsername
  };

  const validator = Yup.object().shape({
    profileEmail: Yup.string()
      .email("Please provide a valid email")
      .required("Email is required"),
    profileUsername: Yup.string()
      .required("Username is required")
      .min(2, "Username must be at least 2 characters"),
    profilePassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    profilePasswordConfirm: Yup.string()
      .required("Confirm your password")
      .min(8, "Password must be at least 8 characters"),
  });

  const updateProfile = (values, {setStatus}) => {
    const headers = {'authorization': jwt};
    httpConfig.put(`/apis/profile/${profile.profileId}`, values, {
      headers: headers})
      .then(reply => {
        let {message, type} = reply;
        setStatus({message, type});

        // if successful
        if(reply.status === 200) {
          dispatch(fetchProfileByProfileId(profile.profileId))
          setTimeout(() => {
            {handleClose()}
            // todo: This is dirty. How to update state in parent component from here?
            window.location.reload()
          }, 1000);
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
      <Button onClick={handleShow} variant="outline-sun-yellow" className="ml-2 align-self-center">
        <FontAwesomeIcon icon="pencil-alt"/>
      </Button>

      {/* Modal Window / Edit Post Form */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editing Profile #{profile.profileId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* EDIT PROFILE FORM */}
          <Formik
            initialValues={updatedProfileContent}
            onSubmit={updateProfile}
            validationSchema={validator}
          >
            {ProfileEditFormContent}
          </Formik>

        </Modal.Body>
      </Modal>
    </>
  )
}

