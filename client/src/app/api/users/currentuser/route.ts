import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import https from "https";

export async function GET() {
	try {
		// Get the JWT token from the cookie
		const cookieStore = cookies();
		const token = cookieStore.get("session");

		// If no token is present, return null for currentUser
		if (!token) {
			return NextResponse.json({ currentUser: null });
		}

		// Make request to the auth service with axios
		const res = await axios.get("https://ticketing.dev/api/users/currentuser", {
			headers: { Cookie: token.value },
			httpsAgent: new https.Agent({
				rejectUnauthorized: false, // Ignore self-signed certificate
			}),
			withCredentials: true, // Send cookies with the request
		});

		return NextResponse.json(res.data);
	} catch (error) {
		console.error("Error fetching current user:", error);
		return NextResponse.json({ currentUser: null });
	}
}
