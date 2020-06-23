import React from "react"

import {SignUpForm} from "./SignUpForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SignUp = () => {
  return (
    <>
      <main className="d-flex align-items-center mh-100 my-5 my-md-0">
        <Container fluid className="py-5">
          <Row>
            <Col md={6} lg={{span: 4, offset: 1}}>
              <Card className="bg-transparent-90 border-0 rounded-0 h-100">
                <Card.Header>
                  <h3>Sign Up!</h3>
                </Card.Header>
                <Card.Body>
                  <SignUpForm/>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={{span: 4, offset: 2}}>
              <Card className="bg-transparent-90 border-0 rounded-0 h-100">
                <Card.Header>
                  <h3>Privacy Notice:</h3>
                </Card.Header>
                <Card.Body>
                  <p>This app has been created for public educational purposes. <span className="font-weight-bold">Profile usernames, email addresses, and posts created here will be publicly viewable via the API</span>, so please keep this in mind before you sign up.</p>
                  <p>We will never spam you, nor use any data here for nefarious purposes. Promise. But we can't promise the same for others.</p>
                  <p>If you'd like to generate an anonymous private email address to use here, give <a href="https://www.sharklasers.com" target="_blank">Sharklasers</a> a try!</p>
                  <p className="text-danger font-weight-bold"><FontAwesomeIcon icon="heart"/>&nbsp;&nbsp;rm -rf /</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
};