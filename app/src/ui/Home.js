import React from "react"
import {Link} from "react-router-dom";

import {UseJwt} from "../utils/jwt-helpers";
import {SignInForm} from './signin/SignInForm'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Home = () => {

  const jwt = UseJwt();
  console.log(jwt)

  return (
    <>
      <main className="d-flex align-items-center mh-100">
        <Container fluid>
          <Row>
            <Col sm={6} lg={{span: 4, offset: 1}}>

              {/* only render the signin form if user does not have a jwt, otherwise output a message */}
              {jwt === null ? (
                <SignInForm/>
              ) : (
                <div>
                  <span className="h2 mr-2 mb-3 d-inline-block">You're logged in!</span>
                  &nbsp;
                  <Link to="/posts">
                    <Button className="btn-sm mb-2" variant="outline-dark">Head to Posts&nbsp;&nbsp;
                      <FontAwesomeIcon icon="arrow-right" />
                    </Button>
                  </Link>
                </div>
              )}

            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}