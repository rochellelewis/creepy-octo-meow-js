import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { httpConfig } from '../../utils/http-config'

import "./Activation.css"
import { Footer } from '../shared/footer/Footer'
import { NavBar } from '../shared/navbar/NavBar'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'
import Badge from "react-bootstrap/Badge";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const Activation = ({match}) => {
  //console.log(match.params.activation)

  const dispatch = useDispatch();

  // run activation GET request on page load
  const effects = () => {
    getActivation();
  };

  const inputs = [];
  useEffect(effects, inputs);

  /* State variables to hold activation reply */
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  /*
  * Handle GET request for user activation
  * */
  const getActivation = () => {
    httpConfig.get(`/apis/signup/activation/${match.params.activation}`)
      .then(reply => {
        let {message, type} = reply;
        setStatus(reply.status)
        setMessage(reply.message)
      })
  }

  return (
    <>
      <main className="mh-100 d-flex flex-column activation">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid>
            <Row className="align-items-center">
              <Col lg={5} className="mb-3">
                <h1 className="font-bungee-shade color-krylon-sun-yellow break-word">Meow Account Activation</h1>
              </Col>

              <Col lg={7} className="text-light mb-3">
                <Card className="bg-dark-50 border">
                  <Card.Body>
                    <h4>{message}</h4>
                    <h4>
                      {/* badge for 200 OK success */}
                      {status === 200 && (<Badge variant="success">Status: {status} OK!</Badge>)}

                      {/* badge for 400 / null token */}
                      {status === 400 &&
                      (<Badge variant="danger">Status: {status}&nbsp; Bad Request!</Badge>)}

                      {/* badge for 418 / invalid token */}
                      {status === 418 &&
                      (<Badge variant="danger">Status:&nbsp;{status}&nbsp;I'm a Teapot!</Badge>)}
                    </h4>
                    <Link className="btn btn-outline-light mt-2" to="/">Log In!&nbsp;&nbsp;<FontAwesomeIcon icon="sign-in-alt"/></Link>
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