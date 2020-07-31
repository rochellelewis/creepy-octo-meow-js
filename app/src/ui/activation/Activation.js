import React from "react"

import "./Activation.css"
import { Footer } from '../shared/footer/Footer'
import { NavBar } from '../shared/navbar/NavBar'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Activation = ({match}) => {

  //dispatch activation api get request using match params
  //output reply onto page

  return (
    <>
      <main className="mh-100 d-flex flex-column activation">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid>
            <Row>
              <Col lg={5}>
                <h1 className="font-bungee-shade color-krylon-sun-yellow">Meow Account Activation</h1>
              </Col>

              <Col lg={7} className="text-light">
                <Card className="bg-dark-50 border mb-3">
                  <Card.Header>
                    <h4 className="">Activation Message HEreActivation Message HEreActivation Message HEreActivation Message HEre&nbsp;&nbsp;
                      <Badge variant="success">Status: 200 OK!</Badge>
                      <Badge variant="danger">Status: 404 Not Found!</Badge>
                    </h4>
                  </Card.Header>
                  <Card.Body>
                    <Link className="btn btn-outline-light" to="/">Log In!&nbsp;&nbsp;<FontAwesomeIcon icon="sign-in-alt"/></Link>
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