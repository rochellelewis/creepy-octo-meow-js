import {Router} from "express";

import {signUpProfile} from '../controllers/signup.controller';
import {signUpValidator} from '../validators/signup.validator';
import {asyncValidator} from '../lib/asyncValidator';

const { checkSchema } = require('express-validator');

export const SignUpRoute = Router()

SignUpRoute.route("/")
	.post(asyncValidator(checkSchema(signUpValidator)), signUpProfile);
