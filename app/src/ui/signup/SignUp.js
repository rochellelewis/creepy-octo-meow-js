import React from "react"

import './SignUp.css';
import {SignUpForm} from "./SignUpForm";
import { NavBar } from '../shared/navbar/NavBar'
import { Footer } from '../shared/footer/Footer'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SignUp = () => {
  return (
    <>
      <main className="mh-100 d-flex flex-column signup">

        <header>
          <NavBar />
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid className="py-5">
            <Row>
              <Col md={6} lg={{span: 4, offset: 1}}>
                <Card className="bg-dark-50 border h-100">
                  <Card.Header>
                    <h3 className="mb-0 text-light">Sign Up!</h3>
                  </Card.Header>
                  <Card.Body>
                    <SignUpForm/>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={{span: 4, offset: 2}}>
                <Card className="bg-dark-50 border text-light h-100">
                  <Card.Header>
                    <h3 className="mb-0">Privacy Notice:</h3>
                  </Card.Header>
                  <Card.Body>
                    <p>This app has been created for public educational purposes. <span className="font-weight-bold">Profile usernames, email addresses, and posts created here will be publicly viewable via the API</span>, so please keep this in mind before you sign up.</p>
                    <p>We will never spam you, nor use any data here for nefarious purposes. Promise. But we can't promise the same for others.</p>
                    <p>If you'd like to generate an anonymous private email address to use here, give <a className="color-krylon-sun-yellow" href="https://www.sharklasers.com" target="_blank">Sharklasers</a> a try!</p>
                    <p className="color-krylon-watermelon font-weight-bold"><FontAwesomeIcon icon="heart"/>&nbsp;&nbsp;rm -rf /</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="text-center text-md-right">
          <Footer />
        </section>
      </main>
    </>
  )
};