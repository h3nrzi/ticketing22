import { RequestHandler } from "express";
import NotAuthorizedError from "../errors/not-authorized-error";

const requireAuth: RequestHandler = (req, res, next) => {
	if (!req.currentUser) throw new NotAuthorizedError();
	next();
};

export default requireAuth;
