import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("Something went wrong!", err);

  return res.status(400).send({
    message: err.message,
  });
};
