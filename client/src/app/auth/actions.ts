"use server";

import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";
import ErrorResponse from "@/types/ErrorResponse";
import https from "https";

export async function signUp(formData: FormData) {
	// Get the email and password from the form data
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		// Send the email and password to the server using axios
		await axios.post(
			"https://ticketing.dev/api/users/signup",
			{
				email,
				password,
			},
			{
				// Ignore self-signed certificate
				httpsAgent: new https.Agent({ rejectUnauthorized: false }),
			}
		);

		// Redirect to the home page after successful signup
		redirect("/");
	} catch (err) {
		// Log the error
		console.error("Signup error:", err);

		// Handle axios error response
		const errorResponse = (err as AxiosError<ErrorResponse>).response?.data;
		return errorResponse;
	}
}
