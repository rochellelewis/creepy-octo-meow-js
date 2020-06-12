import express, {Application, Errback, ErrorRequestHandler, NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import csrf from "csurf";

import {passportMiddleware} from "./lib/auth.controller";
import passport = require("passport");

const session = require("express-session");
const MemoryStore = require("memorystore")(session);

// Routes
import {IndexRoute} from './routes/index.route';
import {ProfileRoute} from "./routes/profile.route";
import {PostRoute} from "./routes/post.route";
import {LikeRoute} from "./routes/like.route";
import {SignInRoute} from "./routes/signin.route";
import {SignUpRoute} from "./routes/signup.route";
import {SignOutRoute} from "./routes/signout.route";

// The following class creates the app and instantiates the server
export class App {

	// state variable type-hinted as an express Application
	app: Application;

	// create the App object
	constructor (
		private port?: number | string
	) {
		passportMiddleware; // eslint-disable-line
		this.app = express();
		this.settings();
		this.middlewares();
		this.routes();
	}

	// private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
	public settings () {
		this.app.set('port', this.port || process.env.PORT || 3000);
	}

	// private method to setting up the middleware to handle json responses, one for dev and one for prod
	private middlewares () {

		const sessionConfig  =  {
			store: new MemoryStore({
				checkPeriod: 10800
			}),
			secret:"secret",
			saveUninitialized: true,
			resave: true,
			maxAge: "3h"
		};

		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(session(sessionConfig));
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		this.app.use(csrf({cookie:false}));
		this.app.use(function (error: any, request : Request, response : Response, next: NextFunction ) {
			if (error.code !== 'EBADCSRFTOKEN') return next(error)

			// handle CSRF token errors here
			response.status(403)

			return response.json({status: 403, message: "xsrf is invalid"})
		})
	}

	// private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
	private routes () {
		this.app.use(IndexRoute);
		this.app.use("/apis/profile", ProfileRoute);
		this.app.use("/apis/post", PostRoute);
		this.app.use("/apis/like", LikeRoute); // todo: this route isn't needed
		this.app.use("apis/signin", SignInRoute);
		this.app.use("apis/signup", SignUpRoute);
		this.app.use("apis/signout", SignOutRoute);
	}

	// starts the server and tells the terminal to post a message that the server is running and on what port
	public async listen (): Promise<void> {
		await this.app.listen(this.app.get('port'));
		console.log("Express application built successfully. Server on port: ", this.app.get('port'));
	}
}