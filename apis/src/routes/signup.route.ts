import {Router} from "express";
import {check, param} from "express-validator";

import {signUpProfileController} from '../controllers/signup.controller';
import {activationController} from "../controllers/activation.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";

import {signUpValidator} from '../validators/signup.validator';
import {activationValidator} from "../validators/activation.validator";

const { checkSchema } = require('express-validator');

export const SignUpRoute = Router()

SignUpRoute.route("/")
	.post(asyncValidatorController(checkSchema(signUpValidator)), signUpProfileController);

SignUpRoute.route("/activation/:activation")
	.get(asyncValidatorController(checkSchema(activationValidator)), activationController)