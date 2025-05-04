import request from "supertest";
import app from "../../app";

const VALID_USER = {
	email: "test@gmail.com",
	password: "password",
};

const INVALID_EMAIL = "testgmail.com"; // missing @
const INVALID_PASSWORD = "p"; // less than 4 characters

describe("POST /api/users/signup", () => {
	describe("should return 400 for invalid inputs", () => {
		it("with an invalid email format", async () => {
			const res = await request(app)
				.post("/api/users/signup")
				.send({
					email: INVALID_EMAIL,
					password: VALID_USER.password,
				})
				.expect(400);

			expect(res.body.errors[0].message).toBeDefined();
		});

		it("with a password that is too short", async () => {
			const res = await request(app)
				.post("/api/users/signup")
				.send({
					email: VALID_USER.email,
					password: INVALID_PASSWORD,
				})
				.expect(400);

			expect(res.body.errors[0].message).toBeDefined();
		});

		it("with missing email", async () => {
			const res = await request(app)
				.post("/api/users/signup")
				.send({
					password: VALID_USER.password,
				})
				.expect(400);

			expect(res.body.errors[0].message).toBeDefined();
		});

		it("with missing password", async () => {
			const res = await request(app)
				.post("/api/users/signup")
				.send({
					email: VALID_USER.email,
				})
				.expect(400);

			expect(res.body.errors[0].message).toBeDefined();
		});

		it("with empty request body", async () => {
			const res = await request(app)
				.post("/api/users/signup")
				.send({})
				.expect(400);

			expect(res.body.errors[0].message).toBeDefined();
			expect(res.body.errors[1].message).toBeDefined();
		});
	});

	it("should return 201 and create a new user with valid credentials", async () => {
		const response = await request(app)
			.post("/api/users/signup")
			.send(VALID_USER)
			.expect(201);

		expect(response.body).toHaveProperty("id");
		expect(response.body.email).toEqual(VALID_USER.email);
	});

	it("should not allow duplicate emails", async () => {
		// Create first user
		await request(app).post("/api/users/signup").send(VALID_USER).expect(201);

		// Try to create user with same email
		const res = await request(app)
			.post("/api/users/signup")
			.send(VALID_USER)
			.expect(400);

		expect(res.body.errors[0].message).toBeDefined();
	});
});
