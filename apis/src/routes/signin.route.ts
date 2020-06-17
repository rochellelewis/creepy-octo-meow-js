import {Router} from 'express';
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {signInValidator} from '../validators/signin.validator';
import {signInController} from "../controllers/signin.controller";
const { checkSchema } = require('express-validator');

export const SignInRoute = Router();

SignInRoute.route('/')
	.post(asyncValidatorController(checkSchema(signInValidator)), signInController);