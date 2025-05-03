import bodyParser from "body-parser";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();

//----------- Middlewares ------------------//

// To enable trust proxy for secure cookies
app.set("trust proxy", true);

// To parse JSON requests
app.use(bodyParser.json());

// To handle cookie sessions
app.use(
	cookieSession({
		signed: false, // Disable signing of cookies
		secure: true, // Use secure cookies (only send over HTTPS)
	}),
);

//----------- Route handlers ------------------//

// Handle user authentication routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Catch-all route for handling undefined routes
app.all("*", async () => {
	throw new NotFoundError();
});

// Handle errors
app.use(errorHandler);

//----------- Start the application ------------------//

const start = async () => {
	try {
		// Check if JWT_KEY is defined in environment variables
		if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined!");

		// Connect to MongoDB
		await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("Connected to MongoDB!");
	} catch (err) {
		console.error(err);
	}

	// Start the server
	app.listen(3000, () => {
		console.log("Listening on port 3000!");
	});
};

start();
