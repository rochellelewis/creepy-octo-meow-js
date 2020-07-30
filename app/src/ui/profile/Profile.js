import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { httpConfig } from '../../utils/http-config'

import { UseJwt, UseJwtProfileId } from '../../utils/jwt-helpers'
import {fetchProfileByProfileId} from '../../store/profiles'
import { ProfileEdit } from './ProfileEdit'
import { handleSessionTimeout } from '../../utils/session-timeout'

import { NavBar } from '../shared/navbar/NavBar'
import { Footer } from '../shared/footer/Footer'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Profile = ({match}) => {

  const dispatch = useDispatch();

  const effects = () => {
    dispatch(fetchProfileByProfileId(match.params.profileId));
  };

  const inputs = [match.params.profileId];
  useEffect(effects, inputs);

  // Return the profile from the redux store
  const profile = useSelector(state => (state.profiles ? state.profiles[0] : null));

  // grab the jwt and jwt profile id for the logged in user
  const jwt = UseJwt();
  const currentProfileId = UseJwtProfileId();

  /**
   * Handles the GET request to resend the activation email
   **/
  const resendActivationEmail = () => {
    const headers = {'authorization': jwt};
    const token = profile.profileActivationToken;

    httpConfig.post(`/apis/signup/activation/${token}`, {activation: token}, {headers: headers})
      .then(reply => {
        let {message, type} = reply;
        window.alert(message)
      });
  };

  /**
   * Handles the DELETE request to delete a profile
   **/
  const deleteProfile = () => {

    // send this data in the request body
    const headers = {'authorization': jwt};
    const data = {
      profileId: profile.profileId
    };

    let confirm = window.confirm("WARNING! Are you sure u want to delete your meow profile? All your data, posts, and likes will be gone FOREVERRR! :O");

    if(confirm) {
      httpConfig.delete(`/apis/profile/${profile.profileId}`, {
        headers, data})
        .then(reply => {
          let {message, type} = reply;

          // if delete profile is successful
          if(reply.status === 200) {
            dispatch(fetchProfileByProfileId(match.params.profileId))
            window.confirm(message)

            // logout user
            // todo: make logout a utility function
            httpConfig.get("/apis/signout/")
              .then(reply => {
                let {message, type} = reply;
                if(reply.status === 200) {
                  window.localStorage.removeItem("jwt");
                  console.log(reply);
                  window.location = "/";
                } else {window.confirm(message)}
              });

          // if delete returns a 400
          } else if(reply.status === 400) {
            handleSessionTimeout()

          // any other delete error
          } else {
            window.confirm(message)
          }
        });
    }
  };

  return (
    <>
      <main className="mh-100 d-flex flex-column profile">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid className="py-5">
            <Row>
              <Col md="7">
                <Card className="bg-dark-50 border">
                  <Card.Header className="d-flex">
                    <h1 className="m-0 flex-grow-1 align-self-center color-krylon-sun-yellow break-word">Hello, {profile && profile.profileUsername}!</h1>

                    {/* Only show the profile edit and delete buttons IF: there is a profile, AND that profileId matches the profileId from the JWT. Whew! */}
                    {
                      profile && (currentProfileId === profile.profileId) &&
                        <>
                          <ProfileEdit profile={profile}/>
                          <Button onClick={deleteProfile} variant="outline-watermelon" className="ml-2 align-self-center">
                            <FontAwesomeIcon icon="trash-alt"/>
                          </Button>
                        </>
                    }

                  </Card.Header>
                  <Card.Body className="text-light">
                    <div><span className="font-weight-bold">Username</span>: {profile && profile.profileUsername}</div>

                    {/* only show private profile data if the user's jwt profileId matches!!! */}
                    {(profile && profile.profileId === currentProfileId) && (
                      <>
                        <div><span className="font-weight-bold">Your Profile Id</span>:&nbsp;{profile.profileId}</div>
                        <div><span className="font-weight-bold">Your Email Address</span>:&nbsp;{profile.profileEmail}</div>
                        <div><span className="font-weight-bold">Account Activated?</span>&nbsp;{profile.profileActivationToken ? ("NO! Please check your email to activate your account.") : "YES! It's all good!"}</div>

                        {/* only show the resend activation option if the account is still unactivated! */}
                        { profile.profileActivationToken !== null && (
                          <Button onClick={resendActivationEmail} variant="outline-seafoam" size="sm" className="mt-2">
                            <FontAwesomeIcon icon="envelope"/>&nbsp;&nbsp;Resend Activation Email
                          </Button>
                        ) }
                      </>
                    )}

                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="text-center text-md-right">
          <Footer/>
        </section>

      </main>
    </>
  )
};