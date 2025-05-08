"use server";

import { ErrorResponse } from "@/types/ErrorResponse";
import { FormState } from "@/types/FormState";
import axios, { AxiosError } from "axios";
import https from "https";
import { cookies } from "next/headers";

export const signUp = async (prevState: FormState, formData: FormData) => {
	// Get the email and password from the form data
	const email = formData.get("email");
	const password = formData.get("password");

	try {
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

		// Get the session cookie
		const sessionCookie = res.headers["set-cookie"]?.[0];

		// Set the session cookie
		if (sessionCookie) {
			cookies().set("session", sessionCookie, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "test",
				sameSite: "none",
				path: "/",
			});
		}

		// Return success response
		return { success: true, errors: [] };
	} catch (err) {
		// Get the errors from the response
		const errors = (err as AxiosError<ErrorResponse>).response?.data.errors;

		// Return error response
		return { success: false, errors: errors || [] };
	}
};
