import {Router} from "express"
import {indexController} from '../controllers/index.controller'

export const IndexRoute = Router()

IndexRoute.route('/apis')
	.get(indexController)