import Link from "next/link";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import https from "https";

async function getCurrentUser() {
	const cookieStore = cookies();
	const token = cookieStore.get("session");

	try {
		const res = await axios.get("https://ticketing.dev/api/users/currentuser", {
			headers: token ? { Cookie: token.value } : {},
			httpsAgent: new https.Agent({ rejectUnauthorized: false }),
			withCredentials: true,
		});

		return res.data;
	} catch (error) {
		console.error(
			"Error fetching current user:",
			(error as AxiosError).response?.data
		);
		return { currentUser: null };
	}
}

export default async function Home() {
	const data = await getCurrentUser();

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
