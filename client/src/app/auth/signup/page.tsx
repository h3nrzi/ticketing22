"use client";

import React, { FormEvent } from "react";
import { useState } from "react";

const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(email, password);
	};
	return (
		<form className="container mt-5 w-50" onSubmit={handleSubmit}>
			<h1 className="text-center mb-5">Sign Up</h1>
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
			</div>
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
			</div>
			<button className="btn btn-primary" type="submit">
				Sign Up
			</button>
		</form>
	);
};

export default SignUpPage;
