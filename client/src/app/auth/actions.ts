"use server";

import { ErrorResponse } from "@/types/ErrorResponse";
import { FormState } from "@/types/FormState";
import axios, { AxiosError } from "axios";
import https from "https";

export const signUp = async (prevState: FormState, formData: FormData) => {
	// Get the email and password from the form data
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		console.log("Sending signup request...");

		// Send the email and password to the server
		const res = await axios.post(
			"https://ticketing.dev/api/users/signup",
			{
				email,
				password,
			},
			{
				httpsAgent: new https.Agent({
					rejectUnauthorized: false, // Ignore self-signed certificate
				}),
				withCredentials: true, // Send cookies with the request
			}
		);

		// Get the session cookie from the response
		const sessionCookie = res.headers["set-cookie"]?.[0];

		// Return success response
		return {
			success: true,
			errors: [],
			token: sessionCookie,
		};
	} catch (err) {
		console.error("Signup error:", err);

		// Get the errors from the response
		const errors =
			(err as AxiosError<ErrorResponse>).response?.data.errors || [];

		// Return error response
		return {
			success: false,
			errors,
			token: "",
		};
	}
};
