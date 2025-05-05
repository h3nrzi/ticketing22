import request from "supertest";
import app from "../../app";

describe("POST /api/users/signout", () => {
	describe("Successful Signout (204)", () => {
		it("clears the cookie after signing out", async () => {
			// Signup user
			await request(app).post("/api/users/signup").send({
				email: "test@gmail.com",
				password: "password",
			});

			// Signout user
			const res = await request(app).post("/api/users/signout").send({});

			expect(res.status).toBe(204);
			expect(res.get("Set-Cookie")![0]).toMatch(/session=;/);
		});
	});
});
