import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import NotFoundError from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();

// To enable trust proxy for secure cookies
app.set("trust proxy", true);

// To parse JSON requests
app.use(bodyParser.json());

// To handle cookie sessions
app.use(
	cookieSession({
		signed: false, // Disable signing of cookies
		secure: process.env.NODE_ENV !== "test", // Only send over HTTPS in production
	})
);

// Handle user authentication routes
app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

// Catch-all route for handling undefined routes
app.all("*", async () => {
	throw new NotFoundError();
});

// Handle errors
app.use(errorHandler);

export default app;
