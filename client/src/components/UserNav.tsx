"use client";

import axiosInstance from "@/lib/utils/axios";
import { AxiosError } from "axios";
interface UserNavProps {
	email: string;
}

export default function UserNav({ email }: UserNavProps) {
	const handleSignOut = async () => {
		try {
			await axiosInstance.post("/api/users/signout", {});
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
