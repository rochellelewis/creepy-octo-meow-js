import React from "react";
import {Link} from "react-router-dom";

import './Footer.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <>
      <footer className="py-2">
        <Container fluid>
          <Row>
            <Col>
							<span className="badge badge-dark p-2">
								<FontAwesomeIcon icon={['fab','github']}/>&nbsp;
                <a href="https://github.com/rlewis2892/creepy-octo-meow-js" className="text-light" target="_blank" rel="noopener noreferrer">View on GitHub</a> | <Link className="text-light" to="/about">About Us</Link>
							</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
};
