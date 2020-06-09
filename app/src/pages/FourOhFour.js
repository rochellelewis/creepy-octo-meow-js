import React from "react"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FourOhFour = () => {
  return (
    <>
      <main className="mh-100 d-flex align-items-center">
        <Container fluid="true">
          <Row>
            <Col>
              <h1>404 Error: Y U NO FIND?</h1>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
};