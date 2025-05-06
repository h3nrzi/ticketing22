"use server";

import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
	// Get the email and password from the form data
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		// Send the email and password to the server
		const response = await fetch("https://ticketing.dev/api/users/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		// If the response is not ok, return the error
		if (!response.ok) return await response.json();

		// Redirect to the signin page
		redirect("/auth/signin");
	} catch (error) {
		// Log the error
		console.error("Signup error:", error);

		// Return the error
		return {
			errors: [
				{
					message: "An unexpected error occurred",
				},
			],
		};
	}
}
