"use client";

import React from "react";
import ErrorDisplay from "@/components/error-display";
import { useFormState } from "react-dom";
import { signUp } from "../actions";
import ErrorResponse from "@/types/ErrorResponse";

const SignUpPage = () => {
	const initialState: ErrorResponse = { errors: [] };
	const [state, formAction] = useFormState(signUp, initialState);

	return (
		<form className="container mt-5 w-50" action={formAction}>
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
					required
				/>
				<ErrorDisplay errors={state?.errors || []} field="email" />
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
					required
				/>
				<ErrorDisplay errors={state?.errors || []} field="password" />
			</div>

			<button className="btn btn-primary" type="submit">
				Sign Up
			</button>

			{/* Error Message that is not related to fields */}
			<div className="mt-5">
				<ErrorDisplay errors={state?.errors || []} />
			</div>
		</form>
	);
};

export default SignUpPage;
