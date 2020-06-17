import {Router} from "express";
import {check, param} from "express-validator";

import {signUpProfileController} from '../controllers/signup.controller';
import {activationController} from "../controllers/activation.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";

import {signUpValidator} from '../validators/signup.validator';

const { checkSchema } = require('express-validator');

export const SignUpRoute = Router()

SignUpRoute.route("/")
	.post(asyncValidatorController(checkSchema(signUpValidator)), signUpProfileController);

SignUpRoute.route("/activation/:activationToken")
	.get(asyncValidatorController(param("activation", "invalid activation link").isHexadecimal().notEmpty()), activationController)