import React from "react"
import {Link} from "react-router-dom";

import {SignInForm} from './signin/SignInForm'
import { NavBar } from './shared/components/NavBar'
import { Footer } from './shared/components/Footer'

import {UseJwt} from "../utils/jwt-helpers";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Home = () => {

  // grab json web token
  const jwt = UseJwt();

  return (
    <>
      <main className="mh-100 d-flex flex-column welcome">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container>
            <Row>
              <Col md={6}>

                {/* only render the signin form if user does not have a jwt, otherwise output a message for logged in users */}
                {jwt === null ? (
                  <>
                    <Row>
                      <Col lg={8}>
                        <SignInForm/>
                        <div>
                          <span className="font-weight-light font-italic text-muted">Don't have an account?&nbsp;</span>
                          <Link className="color-krylon-seafoam" to="/signup">Sign Up</Link>
                        </div>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <div>
                    <div className="h1 mb-4">You're logged in!</div>
                    <Link to="/posts">
                      <Button className="mb-2" variant="outline-light" size="lg">Head to Posts&nbsp;&nbsp;
                        <FontAwesomeIcon icon="arrow-right" />
                      </Button>
                    </Link>
                  </div>
                )}

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
}