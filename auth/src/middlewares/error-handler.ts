import { ErrorRequestHandler } from "express";
import { RequestValidationError } from "../errors/request-validation";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    console.log("handling request validation error");
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("handling database connection error");
  }

  return res.status(400).send({
    message: err.message,
  });
};
