import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation";

const validateRequest: RequestHandler = (req, res, next) => {
	// handle validation of email and password
	// if validation fails, throw a RequestValidationError
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

	next();
};

export default validateRequest;
