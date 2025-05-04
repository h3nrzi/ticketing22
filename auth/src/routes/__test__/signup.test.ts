import request from "supertest";
import app from "../../app";

it("should returns 201 on successful signup", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "test@gmail.com",
			password: "password",
		})
		.expect(201);
});
