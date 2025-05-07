"use server";

import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";
import ErrorResponse from "@/types/ErrorResponse";
import https from "https";

export async function signUp(
	prevState: ErrorResponse | undefined,
	formData: FormData
) {
	// Get the email and password from the form data
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		// Send the email and password to the server
		await axios.post(
			"https://ticketing.dev/api/users/signup",
			{
				email,
				password,
			},
			{
				httpsAgent: new https.Agent({
					rejectUnauthorized: false, // Ignore self-signed certificate
				}),
			}
		);
	} catch (err) {
		// Handle axios error response
		return (err as AxiosError<ErrorResponse>).response?.data;
	}

	// Redirect to the home page after successful signup
	redirect("/");
}
