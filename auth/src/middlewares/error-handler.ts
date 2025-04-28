import { ErrorRequestHandler } from "express";
import { RequestValidationError } from "../errors/request-validation";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      return {
        field: error.param,
        message: error.msg,
      };
    });

    return res.status(400).send({
      errors: formattedErrors,
    });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({
      errors: [{ message: err.reason }],
    });
  }

  return res.status(400).send({
    errors: [{ message: "Something went wrong!" }],
  });
};
