import request from "supertest";
import app from "../../app";

it("should returns 201 on successful signup", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@gmail.com",
			password: "password",
		})
		.expect(201);
});

it("should returns 400 with an invalid email", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "testgmail.com", // missing @
			password: "password",
		})
		.expect(400);
});

it("should returns 400 with an invalid password", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@gmail.com",
			password: "p", // less than 4 characters
		})
		.expect(400);
});

it("should returns 400 with missing email and password", async () => {
	// missing email
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@gmail.com",
		})
		.expect(400);

	// missing password
	await request(app)
		.post("/api/users/signup")
		.send({
			password: "password",
		})
		.expect(400);
});
