import express, { Request, Response } from "express";
import { body } from "express-validator";
import validateRequest from "../middlewares/validate-request";
import jwt from "jsonwebtoken";
import User from "../models/user";
import BadRequestError from "../errors/bad-request-error";
import { Password } from "../services/password";

const router = express.Router();

router.post(
	"/api/users/signin",
	[
		body("email").isEmail().withMessage("Email must be valid."),
		body("password")
			.trim()
			.notEmpty()
			.withMessage("You must supply a password."),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// destructure email and password from request body
		const { email, password } = req.body;

		// check if user exists
		// if user does not exist, throw a BadRequestError
		const existingUser = await User.findOne({ email });
		if (!existingUser) throw new BadRequestError("Invalid credentials");

		// check if password is valid
		// if passwords do not match, throw a BadRequestError
		const passwordsMatch = await Password.compare(
			existingUser.password,
			password
		);
		if (!passwordsMatch) throw new BadRequestError("Invalid credentials");

		// generate JWT token
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!
		);

		// store JWT token in session
		req.session = { jwt: userJwt };

		return res.status(200).json(existingUser);
	}
);

export { router as signinRouter };
