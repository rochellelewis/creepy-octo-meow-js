import {Router} from "express";

import {signUpProfileController} from '../controllers/signup.controller';
import {activationController} from "../controllers/activation.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {resendActivationEmailController} from "../controllers/resendactivationemail.controller";

import {signUpValidator} from '../validators/signup.validator';
import {activationValidator} from "../validators/activation.validator";

const { checkSchema } = require('express-validator');

export const SignUpRoute = Router()

SignUpRoute.route("/")
	.post(asyncValidatorController(checkSchema(signUpValidator)), signUpProfileController);

// route handles profile activation on initial sign up (GET) AND resending activation email (POST)
SignUpRoute.route("/activation/:activation")
	.get(asyncValidatorController(checkSchema(activationValidator)), activationController)
	.post(asyncValidatorController(checkSchema(activationValidator)), resendActivationEmailController)