import Link from "next/link";
import axios from "axios";
import { cookies } from "next/headers";
import https from "https";

export default async function Home() {
	// Get the JWT token from the cookie
	const cookieStore = cookies();
	const token = cookieStore.get("session");

	let data;

	try {
		// Make request to the auth service with axios
		const res = await axios.get("https://ticketing.dev/api/users/currentuser", {
			headers: token ? { Cookie: token.value } : {},
			httpsAgent: new https.Agent({
				rejectUnauthorized: false, // Ignore self-signed certificate
			}),
			withCredentials: true, // Send cookies with the request
		});

		data = res.data;
	} catch (error) {
		console.error("Error fetching current user:", error);
		data = { currentUser: null };
	}

	return (
		<div className="container mt-5">
			{data.currentUser ? (
				<div>
					<h1>Welcome {data.currentUser.email}!</h1>
					<p>You are signed in.</p>
				</div>
			) : (
				<div>
					<h1>Welcome to Ticketing</h1>
					<p>Please sign in to continue.</p>
					<Link href="/auth/login" className="btn btn-primary">
						Sign In
					</Link>
				</div>
			)}
		</div>
	);
}
