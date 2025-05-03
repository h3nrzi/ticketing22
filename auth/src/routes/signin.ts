import express, { Request, Response } from "express";
import { body } from "express-validator";
import BadRequestError from "../errors/bad-request-error";
import validateRequest from "../middlewares/validate-request";
import User from "../models/user";
import JwtService from "../services/jwt-service";
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
		const userJwt = JwtService.sign({
			email,
			id: existingUser.id,
		});

		// store JWT token in session
		req.session = { jwt: userJwt };

		return res.status(200).json(existingUser);
	}
);

export { router as signinRouter };
