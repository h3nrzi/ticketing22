"use client";

import React, { FormEvent } from "react";
import { useState } from "react";
import ErrorResponse from "@/types/ErrorResponse";
import ErrorDisplay from "@/components/error-display";
import { signUp } from "../actions";

const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorResponse, setErrorResponse] = useState<ErrorResponse>({
		errors: [],
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append("email", email);
			formData.append("password", password);

			const result = await signUp(formData);
			if (result) {
				setErrorResponse(result);
			}
		} catch (error) {
			console.error("Unexpected error:", error);
		}
	};

	return (
		<form className="container mt-5 w-50" onSubmit={handleSubmit}>
			<h1 className="text-center mb-5">Sign Up</h1>

			{/* Email */}
			<div className="form-group">
				<label className="form-label" htmlFor="email">
					Email
				</label>
				<input
					className="form-control"
					type="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<ErrorDisplay errors={errorResponse.errors} field="email" />
			</div>

			{/* Password */}
			<div className="form-group">
				<label className="form-label" htmlFor="password">
					Password
				</label>
				<input
					className="form-control"
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<ErrorDisplay errors={errorResponse.errors} field="password" />
			</div>

			<button className="btn btn-primary" type="submit">
				Sign Up
			</button>

			{/* Error Message that is not related to fields */}
			<div className="mt-5">
				<ErrorDisplay errors={errorResponse.errors} />
			</div>
		</form>
	);
};

export default SignUpPage;
