import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

// Main Express application setup
const app = express();
app.use(json());

// Route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Catch-all route for handling undefined routes
app.all("*", () => {
  throw new NotFoundError();
});

// Middleware to handle errors
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("Listening on port 3000!!");
});
