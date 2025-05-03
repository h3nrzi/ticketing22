import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	// if the error is a CustomError,
	// return the status code and errors
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({
			errors: err.serializeErrors(),
		});
	}

	// if the error is not a CustomError,
	// return a 400 status code and a generic error message
	return res.status(400).send({
		errors: [{ message: "Something went wrong!" }],
	});
};
