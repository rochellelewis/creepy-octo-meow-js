import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

// import child components
import {NavBar} from '../shared/navbar/NavBar'
import {PostForm} from "./PostForm";
import {PostCard} from "./PostCard";
import { Footer } from '../shared/footer/Footer'

// import rlewis helpers :D
import {UseWindowWidth} from "../../utils/window-width";
import {UseJwt} from "../../utils/jwt-helpers";

// import actions/reducers
import {fetchAllLikes} from "../../store/likes";
import {fetchAllPostsAndProfiles} from '../../store/posts';

// import bootstrap stuff
import './Posts.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal'
import Collapse from 'react-bootstrap/Collapse';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Posts = () => {

  /**
  * const width holds the value of the screen width on the resize event.
  * @See UseWindowWidth
  **/
  const width = UseWindowWidth();

  // grab jwt for logged in users
  const jwt = UseJwt();

  // state variables for search terms
  const [searchQuery, setSearchQuery] = useState('');

  // state variable to control show/hide modal window
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // state variable to control show/hide mobile search
  const [openSearch, setOpenSearch] = useState(false);

  // handle change event for search form
  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  // Returns all posts from redux store and assign it to the statePosts variable.
  const statePosts = useSelector(state => (state.posts ? state.posts : []));

  // Filter statePosts based on the users search term, the post title, and the post content
  const posts = statePosts.filter(post => post.postContent.includes(searchQuery) || post.postTitle.includes(searchQuery));

  // assigns useDispatch reference to the dispatch variable for later use.
  const dispatch = useDispatch();

  // Define the side effects that will occur in the application, e.g., code that handles dispatches to redux, API requests, or timers.
  // The dispatch function takes actions as arguments to make changes to the store/redux.
  const effects = () => {
    dispatch(fetchAllPostsAndProfiles());
    dispatch(fetchAllLikes());
  };

  // Declare any inputs that will be used by functions that are declared in sideEffects.
  const inputs = [];

  /**
   * Pass both sideEffects and sideEffectInputs to useEffect.
   * useEffect is what handles re-rendering of components when sideEffects resolve.
   * E.g when a network request to an api has completed and there is new data to display on the dom.
   **/
  useEffect(effects, inputs);

  return (
    <>
      <main className="mh-100 d-flex flex-column posts">
        {/* HEADER AND NAVBAR - INCLUDING MOBILE OPTIONS */}
        <header className="fixed-top">
          <NavBar/>

          {/* MOBILE POST OPTIONS - POST & SEARCH BUTTONS - ONLY IF LOGGED IN */}
          { jwt !== null && (
             width < 768 && (
              <Container className="mobile-post-options py-4">
                <Row>
                  <Col className="col-6 text-center">
                    <Button variant="outline-dark" onClick={handleShow} className="btn-block btn-lg"><FontAwesomeIcon icon="edit" />&nbsp;Post</Button>
                  </Col>
                  <Col className="col-6 text-center">
                    <Button variant="outline-dark" className="btn-block btn-lg" onClick={() => setOpenSearch(!openSearch)}><FontAwesomeIcon icon="search" />&nbsp;Search</Button>
                  </Col>
                  <Col>
                    <Collapse in={openSearch}>
                      <Form>
                        <Form.Control type="text"
                                      placeholder="Search"
                                      id="search-text"
                                      onChange={handleChange}
                                      value={searchQuery}
                                      className="mt-3"
                        />
                      </Form>
                    </Collapse>
                  </Col>
                </Row>
              </Container>
            )
          )}

        </header>

        <section className="py-5">
          <Container fluid className="py-5">
            <Row>

              {/* BEGIN DESKTOP POST FORM PANEL */}
              <Col md={4} className={`posts-form-panel position-fixed-md ${(jwt === null && "panel-position-reset")}`}>

                {/* DESKTOP SEARCH FORM - SHOW ON MD SCREENS UP ONLY */}
                { width > 768 && (
                  <Card className="mb-3 bg-black">
                    <Card.Body>
                      <Form>
                        <FormLabel className="h4 color-krylon-seafoam">Search Posts</FormLabel>
                        <Form.Control type="text"
                                      placeholder="Search"
                                      id="search-text"
                                      onChange={handleChange}
                                      value={searchQuery}
                        />
                      </Form>
                    </Card.Body>
                  </Card>
                )}

                {/* This nested ternary will render a PostForm only if jwt is not null,
							otherwise show signin/signup links. Then render the post form only on the correct screen widths.
							These conditionals using the UseWindowWidth helper function allow the rendering of elements to be responsive. */}
                {jwt !== null ? (
                  width < 768 ? (
                    /* MOBILE POST FORM - MODAL */
                    <Modal id="mobile-postform-modal" show={show} onHide={handleClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Post A Meow</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <PostForm/>
                      </Modal.Body>
                    </Modal>
                  ) : (
                    /* DESKTOP POST FORM */
                    <Card variant="dark" className="mb-3 bg-black">
                      <Card.Body>
                        <h2 className="d-none d-md-block color-krylon-seafoam">Post A Meow</h2>
                        <PostForm/>
                      </Card.Body>
                    </Card>
                  )
                ) : (
                  /* DISPLAY THIS IF NOT LOGGED IN */
                  <Card className="mb-3 bg-black">
                    <Card.Body>
                      <h2 className="mb-3 color-krylon-seafoam">Please log in to post a meow.</h2>
                      <Link to="/" className="btn btn-outline-seafoam mr-3">Sign In</Link>
                      <Link to="/signup" className="btn btn-seafoam">Sign Up</Link>
                    </Card.Body>
                  </Card>
                )}

                {/* FOOTER - DISPLAY HERE ONLY ON MD SCREENS */}
                <section className="text-center text-md-left fixed-bottom d-none d-md-block">
                  <Footer/>
                </section>
              </Col>

              {/* BEGIN POST ITEMS */}
              <Col md={{span: 8, offset: 4}} className="posts-panel">
                {/* create an inner bootstrap row for grid like card layout*/}
                <Row>
                  {posts.map(post =>
                    <PostCard post={post} key={post.postId} />
                  )}
                </Row>
              </Col>
            </Row>

          </Container>
        </section>
      </main>
    </>
  )
};