import { RequestHandler } from "express";
import JwtService from "../services/jwt-service";

interface UserPayload {
	id: string;
	email: string;
	iat?: number;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

const currentUser: RequestHandler = (req, res, next) => {
	if (!req.session?.jwt) return next();

	try {
		const payload = JwtService.verify(req.session.jwt);
		req.currentUser = payload;
	} catch (err) {}

	next();
};

export default currentUser;
