import React from "react"

import { Footer } from './shared/components/Footer'
import { NavBar } from './shared/components/NavBar'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FourOhFour = () => {
  return (
    <>
      <main className="mh-100 d-flex flex-column not-found">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid>
            <Row>
              <Col>
                <h1 className="font-bungee-shade color-krylon-sun-yellow">404 Error: Y U NO FIND?</h1>
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