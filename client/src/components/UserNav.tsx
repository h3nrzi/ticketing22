"use client";

import axios, { AxiosError } from "axios";

interface UserNavProps {
	email: string;
}

export default function UserNav({ email }: UserNavProps) {
	const handleSignOut = async () => {
		try {
			await axios.post("/api/users/signout", {}, { withCredentials: true });
		} catch (error) {
			console.error((error as AxiosError).response?.data);
		}
	};

	return (
		<>
			<span className="nav-item nav-link">{email}</span>
			<button
				onClick={handleSignOut}
				className="nav-item nav-link btn btn-link"
			>
				Sign Out
			</button>
		</>
	);
}
