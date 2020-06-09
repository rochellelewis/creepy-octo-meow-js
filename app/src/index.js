import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
// import reducers from "./shared/reducers";
import {Provider} from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';

import "./index.css";
import {NavBar} from "./shared/components/NavBar";
import {Footer} from "./shared/components/Footer";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Posts} from "./pages/posts/Posts";
import {Profile} from "./pages/Profile";
import {SignUp} from "./pages/signup/SignUp";
import {FourOhFour} from "./pages/FourOhFour";

import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab, faGithub} from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faCat,
  faEllipsisH,
  faEnvelope,
  faHeart,
  faKey,
  faPencilAlt,
  faSignInAlt,
  faSignOutAlt,
  faTrash,
  faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, fas, faCat, faEllipsisH, faEnvelope, faHeart, faGithub, faKey, faPencilAlt, faSignInAlt, faSignOutAlt, faTrash, faUser);

// const store = createStore(reducers, applyMiddleware(thunk));

const Routing = () => (
  <>
    {/*<Provider store={store}>*/}
      <BrowserRouter>
        <div className="sfooter-content">
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/posts" component={Posts}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/profile/:profileId" component={Profile} profileId=":profileId"/>
            <Route component={FourOhFour}/>
          </Switch>
        </div>
        <Footer/>
      </BrowserRouter>
    {/*</Provider>*/}

  </>
);

// ReactDOM.render(Routing(store) , document.querySelector("#root"));
ReactDOM.render(<Routing/>, document.querySelector('#root'));