import axios, { AxiosError } from "axios";
import { cookieManager } from "../utils/cookie-utils";
import { ErrorResponse } from "@/types/ErrorResponse";

export async function getCurrentUser() {
	// Get the session cookie
	const token = cookieManager.get("session");

	try {
		// Make the request to the auth service
		const res = await axios.get("http://ticketing.dev/api/users/currentuser", {
			headers: token ? { Cookie: token.value } : {},
		});

		// Get the data from the response
		const data = res.data;

		// Return the response data
		return { data };
	} catch (error) {
		// Get the errors from the response
		const errors = (error as AxiosError<ErrorResponse>).response?.data.errors;

		// Return the response data
		return { errors };
	}
}
