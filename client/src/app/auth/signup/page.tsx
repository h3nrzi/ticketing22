"use client";

import React from "react";
import ErrorDisplay from "@/components/error-display";
import { useFormState } from "react-dom";
import { signUp } from "../actions";
import SubmitButton from "@/components/submit-button";
import ErrorResponse from "@/types/ErrorResponse";
import FormField from "@/components/form-field";

const SignUpPage = () => {
	const initialState: ErrorResponse = { errors: [] };
	const [state, formAction] = useFormState(signUp, initialState);

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<form className="card p-4" action={formAction}>
						<h1 className="text-center mb-4">Sign Up</h1>

						<FormField
							label="Email"
							name="email"
							type="email"
							placeholder="Enter your email"
							errors={state?.errors}
						/>

						<FormField
							label="Password"
							name="password"
							type="password"
							placeholder="Enter your password"
							errors={state?.errors}
						/>

						<SubmitButton className="btn btn-primary w-100 mb-3">
							Sign Up
						</SubmitButton>

						{/* Display general errors */}
						<ErrorDisplay errors={state?.errors} />
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
