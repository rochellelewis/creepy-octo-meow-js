# creepy-octo-meow-js

Demo app using the Deep Dive Bootcamp toolkit.

## React SpinUp - Adding React To an Existing Project
#### React Spinup must be completed by one member of the team but it is recommended that it is done as a group with the rest of the team members  watching/looking for missing semi colons.
1. cd into the project and run `npx create-react-app app`
2. add the following packages to package.json under **"dependencies"**
```
"@fortawesome/fontawesome-svg-core": "^1.2.17",
"@fortawesome/free-brands-svg-icons": "^5.12.1",
"@fortawesome/free-regular-svg-icons": "^5.12.1",
"@fortawesome/free-solid-svg-icons": "^5.8.1",
"@fortawesome/react-fontawesome": "^0.1.4",
"axios": "^0.18.0",
"bootstrap": "^4.3.1",
"formik": "^1.5.4",
"http-proxy-middleware": "^0.19.1",
"react": "^16.9.0",
"react-dom": "^16.9.0",
"react-bootstrap": "^1.0.0-beta.10",
"react-redux": "^7.1.0",
"react-router": "^5.0.1",
"react-router-bootstrap": "^0.25.0",
"react-router-dom": "^5.0.0",
"react-scripts": "^3.1.1",
"redux": "^4.0.4",
"redux-thunk": "^2.3.0",
"standard": "^14.3.4",
"yup": "^0.27.0"
```
3. run `npm install` in the /app directory
4. delete every file in `app/src`
5. create a new file called `app/src/index.js` and add the content below:
```
import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';

const App = () => ( <h1 className="text-info">hello world</h1> );
ReactDOM.render(<App/>, document.querySelector('#root'));
```
* __Optional__ run `npm start` in `/app` to see if the setup was successful

## Add React Router To The project
1. Create a new Component file called **Home.js** in `/app/src/pages`
2. Add the content below to the file:
```
import React from "react"

export const Home = () => {
	return (
		<>
			<h1>Home</h1>
		</>
	)
}
```
3. create a new Component file called **FourOhFour.js** in `/app/src/pages`
add the content below to the file:
```
import React from "react"

export const FourOhFour = () => {
	return (
		<>
			<h1>Y U NO FIND</h1>
		</>
	)
};

```
4. Inside **app/src/index.js** replace the following...
 ```
 import React from 'react';
 import ReactDOM from 'react-dom'
 import 'bootstrap/dist/css/bootstrap.css';
 
 const App = () => (<h1 className="text-info">hello world</h1>);
 ReactDOM.render(<App/>, document.querySelector('#root'));
 ```
 
 with this:
```
import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {FourOhFour} from "./pages/FourOhFour";
import {Home} from "./pages/Home";

const Routing = () => (
	<>

		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route component={FourOhFour}/>
			</Switch>
		</BrowserRouter>

	</>
);
ReactDOM.render(<Routing/>, document.querySelector('#root'));
```
## Express Spinup - Adding Express To An Existing Project
Coming Soon