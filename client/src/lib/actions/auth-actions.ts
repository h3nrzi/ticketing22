"use server";

import { ErrorResponse } from "@/types/ErrorResponse";
import { FormState } from "@/types/FormState";
import { AxiosError } from "axios";
import axiosInstance from "../utils/axios";
import { cookieManager } from "../utils/cookie-utils";

export const signUp = async (prevState: FormState, formData: FormData) => {
	// Get the email and password from the form data
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		// Send the email and password to the server
		const res = await axiosInstance.post("/api/users/signup", {
			email,
			password,
		});

		// Get and Set the session cookie
		const sessionCookie = res.headers["set-cookie"]?.[0];
		if (sessionCookie) cookieManager.set("session", sessionCookie);

		// Return success response
		return { success: true, errors: [] };
	} catch (err) {
		// Get the errors from the response
		const errors = (err as AxiosError<ErrorResponse>).response?.data.errors;

		// Return error response
		return { success: false, errors: errors || [] };
	}
};

export const signin = async (prevState: FormState, formData: FormData) => {
	// Get the email and password from the form data
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		// Send the email and password to the server
		const res = await axiosInstance.post("/api/users/signin", {
			email,
			password,
		});

		// Get and Set the session cookie
		const sessionCookie = res.headers["set-cookie"]?.[0];
		if (sessionCookie) cookieManager.set("session", sessionCookie);

		// Return success response
		return { success: true, errors: [] };
	} catch (err) {
		// Get the errors from the response
		const errors = (err as AxiosError<ErrorResponse>).response?.data.errors;

		// Return error response
		return { success: false, errors: errors || [] };
	}
};
