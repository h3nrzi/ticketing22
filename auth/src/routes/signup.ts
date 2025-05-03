import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../errors/bad-request-error";
import validateRequest from "../middlewares/validate-request";
import User from "../models/user";

const router = express.Router();

router.post(
	"/api/users/signup",
	[
		body("email").isEmail().withMessage("Email must be valid."),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// destructure email and password from request body
		const { email, password } = req.body;

		// check if user already exists
		// if user exists, throw a BadRequestError
		const existingUser = await User.findOne({ email });
		if (existingUser) throw new BadRequestError("Email in use");

		// create a new user and save to database
		const user = User.build({ email, password });
		await user.save();

		// generate JWT token
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_KEY!
		);

		// store JWT token in session
		req.session = { jwt: userJwt };

		// send response with user data
		return res.status(201).json(user);
	}
);

export { router as signupRouter };
