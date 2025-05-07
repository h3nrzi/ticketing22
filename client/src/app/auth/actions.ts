"use server";

import { ErrorResponse } from "@/types/ErrorResponse";
import { FormState } from "@/types/FormState";
import axios, { AxiosError } from "axios";
import https from "https";

export async function signUp(
	prevState: FormState | undefined,
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

		// Return success response
		return { success: true, errors: [] };
	} catch (err) {
		// Handle axios error response
		const errorData = (err as AxiosError<ErrorResponse>).response?.data;
		return { success: false, ...errorData };
	}
}
