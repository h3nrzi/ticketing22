import React from "react";

const SignUpPage = () => {
	return (
		<form className="container mt-5 w-50">
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
				/>
			</div>
			<button className="btn btn-primary" type="submit">
				Sign Up
			</button>
		</form>
	);
};

export default SignUpPage;
