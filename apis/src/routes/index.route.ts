import {Router} from "express"
import {indexController} from '../controllers/index.controller'

export const indexRoutes = Router()

indexRoutes.route('/apis')
	.get(indexController)