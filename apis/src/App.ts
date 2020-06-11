import express, {Application, Errback, ErrorRequestHandler, NextFunction, Request, Response} from 'express';
import morgan from 'morgan';

// Routes
import {indexRoutes} from './routes/index.route';
import {ProfileRoute} from "./routes/profile.route";
import {PostRoute} from "./routes/post.route";
import {LikeRoute} from "./routes/like.route";

// The following class creates the app and instantiates the server
export class App {

	// state variable type-hinted as an express Application
	app: Application;

	// create the App object
	constructor (
		private port?: number | string
	) {
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
		this.app.use(morgan('dev'));
		this.app.use(express.json());
	}

	// private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
	private routes () {
		this.app.use(indexRoutes);
		this.app.use("/apis/profile", ProfileRoute);
		this.app.use("/apis/post", PostRoute);
		this.app.use("/apis/like", LikeRoute);
	}

	// starts the server and tells the terminal to post a message that the server is running and on what port
	public async listen (): Promise<void> {
		await this.app.listen(this.app.get('port'));
		console.log("Express application built successfully");
	}
}