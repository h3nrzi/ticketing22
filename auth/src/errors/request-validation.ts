import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();
    this.errors = errors;

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { felid: string; message: string }[] {
    return this.errors.map((error) => {
      return {
        felid: error.param,
        message: error.msg,
      };
    });
  }
}
