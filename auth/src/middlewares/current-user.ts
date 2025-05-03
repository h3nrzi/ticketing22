import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const currentUser: RequestHandler = (req, res, next) => {
	// if there is no jwt in the session,
	// go to the next middleware
	if (!req.session?.jwt) return next();

	// If the jwt is valid, set the currentUser property on the request
	// if not valid, set currentUser to null
	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
		req.currentUser = payload;
	} catch (err) {
		req.currentUser = null;
	}

	next();
};
