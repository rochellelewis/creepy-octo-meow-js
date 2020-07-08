import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";


// rlewis's special helpers :D
import { UseJwt } from '../../utils/jwt-helpers'
import { DecodeCharacters } from '../../utils/decode-characters'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { fetchAllPostsAndProfiles } from '../../store/posts'

export const ProfileEdit = (props) => {

  // this is the profile passed in via props
  const {profile} = props;
  console.log(profile.profileId)

  // controls show/hide modal window
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [status, setStatus] = useState(null);
  const dispatch = useDispatch()

  // grab json web token
  const jwt = UseJwt();

  /*
	* Set initial values to the existing profile data, and de-encode
	* special characters here first for proper output to front end.
	* Post content will be re-encoded and sanitized on update with
	* express-validator in the api.
	* */
  const updatedProfileContent = {
    profileActivationToken: profile.profileActivationToken,
    profileEmail: profile.profileEmail,
    profilePassword: null,
    profileUsername: profile.profileUsername
  };

  const validator = Yup.object().shape({
    postTitle: Yup.string()
      .required("A title is required.")
      .max(64, "No titles longer than 64 characters."),
    postContent: Yup.string()
      .required("U gonna post something?")
      .max(2000, "2000 characters max per meow.")
  });

  const updateProfile = (values, {setStatus}) => {
    const headers = {'authorization': jwt};
    httpConfig.put(`/apis/profile/${profile.profileId}`, values, {
      headers: headers})
      .then(reply => {
        let {message, type} = reply;
        setStatus({message, type});
        if(reply.status === 200) {
          dispatch(fetchAllPostsAndProfiles())
          setTimeout(() => {
            {handleClose()}
          }, 750);
        }
        setStatus({message, type});
      });
  };

  return (
    <>
      <Button onClick={handleShow} variant="outline-secondary">
        <FontAwesomeIcon icon="pencil-alt"/>
      </Button>

      {/* Modal Window / Edit Post Form */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editing Profile #</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* EDIT PROFILE FORM */}
          foo!
          {/*<Formik*/}
          {/*  initialValues={updatedPostContent}*/}
          {/*  onSubmit={updatePost}*/}
          {/*  validationSchema={validator}*/}
          {/*>*/}
          {/*  {PostEditFormContent}*/}
          {/*</Formik>*/}

        </Modal.Body>
      </Modal>
    </>
  )
}

