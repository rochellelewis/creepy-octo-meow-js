import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {httpConfig} from "../../../utils/http-config";
import {Link} from "react-router-dom";

//import {UseJwt, UseJwtProfileId, UseJwtUsername} from "../misc/JwtHelpers";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const NavBar = () => {
  return (
    <>
      <header>
        <Navbar bg="light" expand="md" variant="light" fixed="top">
          <Link to="/">
            <Navbar.Brand>=^ Octo Meow 8.0 ^=</Navbar.Brand>
          </Link>
          <Navbar.Text className="small font-italic d-none d-md-inline-block">A DDC React Demo.</Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

          <Navbar.Collapse>
            <Nav className="ml-auto">

              {/* conditional render if user has jwt / is logged in */}
              {/*{jwt !== null && (*/}
              {/*  <NavDropdown className="nav-link navbar-username" title={"Welcome, " + username + "!"}>*/}
              {/*    <div className="dropdown-item">*/}
              {/*      <Link to={`/profile/${profileId}`} className="nav-link">*/}
              {/*        <FontAwesomeIcon icon="user" />&nbsp;&nbsp;My Profile*/}
              {/*      </Link>*/}
              {/*    </div>*/}
              {/*    <div className="dropdown-divider"></div>*/}
              {/*    <div className="dropdown-item sign-out-dropdown">*/}
              {/*      <button className="btn btn-outline-dark" onClick={signOut}>*/}
              {/*        Sign Out&nbsp;&nbsp;<FontAwesomeIcon icon="sign-out-alt" />*/}
              {/*      </button>*/}
              {/*    </div>*/}
              {/*  </NavDropdown>*/}
              {/*)}*/}

              <Link className="nav-link" to="/posts">
                <Button variant="outline-dark" className="btn-block">
                  <FontAwesomeIcon icon="cat" />&nbsp;Posts
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  )
}