import {Router} from "express";

import {signUpProfileController} from '../controllers/signup.controller';

import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {signUpValidator} from '../validators/signup.validator';

const { checkSchema } = require('express-validator');

export const SignUpRoute = Router()

SignUpRoute.route("/")
	.post(asyncValidatorController(checkSchema(signUpValidator)), signUpProfileController);
