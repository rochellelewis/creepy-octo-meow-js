import React from "react";
import {Link} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <>
      <footer className="py-2 fixed-bottom">
        <Container fluid="true">
          <Row>
            <Col className="text-center text-md-right">
							<span className="badge badge-light">
								<FontAwesomeIcon icon={['fab','github']}/>&nbsp;
                <a href="https://github.com/rlewis2892/creepy-octo-meow-js" className="text-dark" target="_blank" rel="noopener noreferrer">View on GitHub</a> | <Link className="text-dark" to="/about">About Us</Link>
							</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
};
