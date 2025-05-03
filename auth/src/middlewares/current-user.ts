import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
	id: string;
	email: string;
	iat: number;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

const currentUser: RequestHandler = (req, res, next) => {
	// if there is no jwt in the session, go to the next middleware
	if (!req.session?.jwt) return next();

	// If the jwt is valid, set the currentUser property on the request
	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPayload;

		req.currentUser = payload;
	} catch (err) {}

	next();
};

export default currentUser;
