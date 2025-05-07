import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";
export async function GET() {
	try {
		// Get the JWT token from the cookie
		const cookieStore = cookies();
		const token = cookieStore.get("session");

		// Make request to the auth service with axios
		const res = await axios.get("https://ticketing.dev/api/users/currentuser", {
			headers: { Cookie: token?.value },
		});

		return NextResponse.json(res.data);
	} catch (error) {
		console.log((error as AxiosError).response?.data);

		return NextResponse.json(
			{ errors: [{ message: "Error fetching current user" }] },
			{ status: 500 }
		);
	}
}
