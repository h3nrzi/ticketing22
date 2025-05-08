import Link from "next/link";
import { getCurrentUser } from "@/lib/api/users-api";

export default async function Home() {
	const { data, errors } = await getCurrentUser();

	if (errors) {
		return (
			<div className="container mt-5">
				<div className="alert alert-danger">
					Error: {errors.map((err) => err.message).join(", ")}
				</div>
			</div>
		);
	}

	if (data?.currentUser) {
		return (
			<div className="container mt-5">
				<h1>Welcome {data.currentUser.email}!</h1>
			</div>
		);
	}

	return (
		<div className="container mt-5">
			<div>
				<h1>Welcome to Ticketing</h1>
				<p>Please sign in to continue.</p>
				<Link href="/auth/login" className="btn btn-primary">
					Sign In
				</Link>
			</div>
		</div>
	);
}
