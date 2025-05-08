import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import https from "https";
import { ErrorResponse } from "@/types/ErrorResponse";
import { User } from "@/types/User";

export async function getCurrentUser() {
	// Get the session cookie
	const cookieStore = cookies();
	const token = cookieStore.get("session");

	try {
		// Make the request to the auth service
		const res = await axios.get<{ currentUser: User }>(
			"https://ticketing.dev/api/users/currentuser",
			{
				headers: token ? { Cookie: token.value } : {},
				httpsAgent: new https.Agent({ rejectUnauthorized: false }),
				withCredentials: true,
			}
		);

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
