import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {httpConfig} from "../../../utils/http-config";
import {Link} from "react-router-dom";

import {UseJwt, UseJwtProfileId, UseJwtUsername} from "../../../utils/jwt-helpers";

import './NavBar.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const NavBar = () => {

  const [token, setToken] = useState(null);

  // use jwt-helpers to grab the jwt and username for logged in users
  const jwt = UseJwt();
  const username = UseJwtUsername();
  const profileId = UseJwtProfileId();

  const signOut = () => {
    httpConfig.get("/apis/signout/")
      .then(reply => {
        let {message, type} = reply;
        if(reply.status === 200) {
          window.localStorage.removeItem("jwt");
          console.log(reply);
          window.location = "/";
          // setToHome(true);
        }
      });
  };

  return (
    <>
      <Navbar expand="md" variant="dark">
          <Link to="/">
            <Navbar.Brand>=^ Octo Meow 8.0 ^=</Navbar.Brand>
          </Link>
          <Navbar.Text className="small font-italic d-none d-md-inline-block">A DDC React + Express Demo.</Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>

          <Navbar.Collapse>
            <Nav className="ml-auto">

              {/* conditional render the sign in form only if user is not logged in */}
              {jwt !== null && (
                <NavDropdown className="nav-link navbar-username" title={"Welcome, " + username + "!"} id="navbar-dropdown">
                  <div className="dropdown-item">
                    <Link to={`/profile/${profileId}`} className="nav-link">
                      <FontAwesomeIcon icon="user" />&nbsp;&nbsp;My Profile
                    </Link>
                  </div>
                  <div className="dropdown-divider"/>
                  <div className="dropdown-item sign-out-dropdown">
                    <button className="btn btn-outline-light" onClick={signOut}>
                      Sign Out&nbsp;&nbsp;<FontAwesomeIcon icon="sign-out-alt" />
                    </button>
                  </div>
                </NavDropdown>
              )}

              <Link className="nav-link" to="/posts">
                <Button variant="outline-light" className="btn-block">
                  <FontAwesomeIcon icon="cat" />&nbsp;Posts
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </>
  )
}