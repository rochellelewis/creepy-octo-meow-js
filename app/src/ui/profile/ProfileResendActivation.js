import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import { UseJwt } from '../../utils/jwt-helpers'
import { fetchProfileByProfileId } from '../../store/profiles'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { ProfileEditFormContent } from './ProfileEditFormContent'


export const ProfileResendActivation = (props) => {

  // grab token off of props
  const token = props


  return (
    <>
      foo
    </>
  )
}