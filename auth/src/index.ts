import { json } from "body-parser";
import express from "express";
import "express-async-errors";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

// Main Express application setup
const app = express();
app.use(json());

// Route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Catch-all route for handling undefined routes
app.all("*", async () => {
  throw new NotFoundError();
});

// Middleware to handle errors
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("Listening on port 3000!!");
});
