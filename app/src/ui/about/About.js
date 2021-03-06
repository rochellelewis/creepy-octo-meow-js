import React from "react"
import {Link} from "react-router-dom";

import './About.css'
import { NavBar } from '../shared/navbar/NavBar'
import { Footer } from '../shared/footer/Footer'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const About = () => {
  return (
    <>
      <main className="mh-100 d-flex flex-column about">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid className="py-5">
            <Row>
              <Col lg={6} className="text-light">
                <h1 className="mb-4 font-bungee-shade color-krylon-sun-yellow">About Us</h1>
                <Card className="bg-dark-50 border mb-3">
                  <Card.Header>
                    <h4 className="mb-0 color-krylon-seafoam">We specialize in extraordinary meow experiences.</h4>
                  </Card.Header>
                  <Card.Body>
                    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
                    <p>Scratch the furniture put butt in owner's face rub whiskers on bare skin act innocent or roll over and sun my belly brown cats with pink ears or step on your keyboard while you're gaming and then turn in a circle meowwww. If I fits I sits. Mark territory... are those your $250 dollar sandals?</p>
                  </Card.Body>
                </Card>
                <div className="my-2 text-right">
                  <span className="font-italic">Don't have an account?&nbsp;&nbsp;</span>
                  <Link className="btn btn-outline-seafoam" to="/signup">Sign up today!</Link>
                </div>
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