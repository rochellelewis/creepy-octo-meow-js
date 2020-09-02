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
"@reduxjs/toolkit": "^1.3.6",
"axios": "^0.18.0",
"bootstrap": "^4.3.1",
"formik": "^1.5.4",
"http-proxy-middleware": "^0.19.1",
"jwt-decode": "^2.2.0",
"lodash": "^4.17.15",
"react": "^16.9.0",
"react-bootstrap": "^1.0.0-beta.10",
"react-dom": "^16.9.0",
"react-redux": "^7.1.0",
"react-router": "^5.0.1",
"react-router-bootstrap": "^0.25.0",
"react-router-dom": "^5.0.0",
"react-scripts": "^3.1.1",
"redux": "^4.0.4",
"redux-thunk": "^2.3.0",
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
1. Add Dockerfile to /sql directory
2. Add .env, .dockerignore, docker-compose.yml files to project root. Update your .gitignore
3. Create an /apis directory, add the Dockerfile. This will be the location of your express back end, apis, etc.
4. Add the package.json and tsconfig.json to /apis
5. Add index.ts, database.ts, and App.ts to apis/src/
6. npm install locally so everything resolves in IDE
7. You can run this App locally: cd into /apis and npm run dev
8. Upload all to your remote host and docker-compose up

## DIGITAL OCEAN DEPLOYMENT AND ISSUING SSL CERTS WITH DOCKER CERTBOT
### [original documentation](https://www.humankode.com/ssl/how-to-set-up-free-ssl-certificates-from-lets-encrypt-using-docker-and-nginx)

### Add starter (http) configuration files for deployment
1. Add and update the staging (http) `nginx.conf` file to /app found [here](https://github.com/rlewis2892/creepy-octo-meow-js/blob/f9b23e5dc7/app/nginx.conf)
2. Add and update the staging (http) `docker-compose.yml` file to the project root found [here](https://github.com/rlewis2892/creepy-octo-meow-js/blob/f9b23e5dc7/docker-compose.yml)

### Issuing the initial cert
1. In your project run `docker-compose up -d`
2. Run the command below

```
sudo docker container run -it --rm \
-v /docker-volumes/<YOUR_PROJECT_NAME>/etc/letsencrypt:/etc/letsencrypt \
-v /docker-volumes/<YOUR_PROJECT_NAME>/etc/lib/letsencrypt:/var/lib/letsencrypt \
-v $(pwd)/app/public:/data/letsencrypt \
-v "/docker-volumes/<YOUR_PROJECT_NAME>/var/log/:/var/log/letsencrypt" \
certbot/certbot \
certonly --webroot \
--register-unsafely-without-email --agree-tos \
--webroot-path=/data/letsencrypt \
--staging \
-d <YOUR_DOMAIN_NAME.COM> -d <WWW.YOUR_DOMAIN_NAME.COM>
```

* `-v /docker-volumes/<YOUR_PROJECT_NAME>/etc/letsencrypt:/etc/letsencrypt \` 
	* Binds the `/etc/letsenscrypt` directory where the key is generated in the certbot container to the localhost's `docker-volumes/<YOUR_PROJECT_NAME>/etc/letsencrypt`
* `-v /docker-volumes/<YOUR_PROJECT_NAME>/etc/lib/letsencrypt:/var/lib/letsencrypt \`
	* binds `/var/lib/letsencrypt` in the certbot container to the localhost's `/docker-volumes/<YOUR_PROJECT_NAME>/etc/lib/letsencrypt`
* `-v $(pwd)/app/public:/data/letsencrypt \`
 	* `$(pwd)` uses the current file location generated by pwd to run a command
 	*  binds `/data/letsencrypt` in the certbot container to the localhost's `/home/user/app/public` so that the ACME challenge can pass.
*  `-v "/docker-volumes/<YOUR_PROJECT_NAME>/var/log/:/var/log/letsencrypt" \`
	* binds the `/var/log/letsencrypt" \` in the certbot container to the localhost's `/docker-volumes/<YOUR_PROJECT_NAME>/var/log/` so that debugging logs from the certbot container can be preserved.
* `certbot/certbot`
	* is the container that is going to be used.
* `certonly --webroot \` sets the webroot to `/`
* `--register-unsafely-without-email --agree-tos \`
	* register unsafely for staging purposes and agree to the terms of service  
* `--webroot-path=/data/letsencrypt \`
	* sets the webroot-path to `/data/letsencrypt` inside of the certbot container
* `--staging \`
	* issues the ssl certificate for staging purposes
* `-d <YOUR_DOMAIN_NAME.COM>`
	* specifies the domain/domains to verify for the ssl certificate
3. If the command from the previous step is successful run `sudo rm -rf /docker-volumes/<YOUR_PROJECT_NAME>`
4. run large command from before but this time without the staging flag and make sure add an email for reminders on when to reissue the certificate (see below)

```
sudo docker container run -it --rm \
-v /docker-volumes/<YOUR_PROJECT_NAME>/etc/letsencrypt:/etc/letsencrypt \
-v /docker-volumes/<YOUR_PROJECT_NAME>/etc/lib/letsencrypt:/var/lib/letsencrypt \
-v $(pwd)/app/public:/data/letsencrypt \
-v "/docker-volumes/<YOUR_PROJECT_NAME>/var/log/:/var/log/letsencrypt" \
certbot/certbot \
certonly --webroot \
--webroot-path=/data/letsencrypt \
--agree-tos \
--email <YOUR_EMAIL> \
-d <YOUR_DOMAIN_NAME.COM> -d <WWW.YOUR_DOMAIN_NAME.COM>
```

### Configuring Containers to Use HTTPS
1. Update the production `nginx.conf` file with the content found [here](https://github.com/rlewis2892/creepy-octo-meow-js/blob/cd56f0dbd0/app/nginx.conf)  
2. Update `docker-compose.yml` with the content found [here](https://github.com/rlewis2892/creepy-octo-meow-js/blob/cd56f0dbd0/docker-compose.yml)
3. run `mkdir dh-param` in your project root on the host machine.
4. run `sudo openssl dhparam -out dh-param/dhparam-2048.pem 2048` in your project on the host machine.
5. run `docker-compose up -d`
