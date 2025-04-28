import { ErrorRequestHandler } from "express";
import { RequestValidationError } from "../errors/request-validation";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  return res.status(400).send({
    errors: [{ message: "Something went wrong!" }],
  });
};
