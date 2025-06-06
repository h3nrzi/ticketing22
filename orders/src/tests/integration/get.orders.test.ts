import mongoose from "mongoose";
import { Ticket } from "../../core/entities/ticket.entity";
import { getOrdersRequest, postOrderRequest } from "../helpers/requests";

describe("GET /api/orders", () => {
	let cookie: string[];
	let otherCookie: string[];

	beforeAll(() => {
		cookie = global.signup();
		otherCookie = global.signup();
	});

	describe("Authentication", () => {
		it("returns a 401 if the user is not authenticated", async () => {
			const res = await getOrdersRequest([]);
			expect(res.status).toBe(401);
		});
	});

	describe("Business logics", () => {
		it("returns an empty array if there are no orders", async () => {
			const res = await getOrdersRequest(cookie);
			expect(res.body).toEqual([]);
		});

		it("returns a list of orders", async () => {
			// Create tickets
			const ticket1 = Ticket.build({
				title: "concert1",
				price: 20,
				id: new mongoose.Types.ObjectId().toHexString(),
			});
			await ticket1.save();
			const ticket2 = Ticket.build({
				title: "concert1",
				price: 20,
				id: new mongoose.Types.ObjectId().toHexString(),
			});
			await ticket2.save();
			const ticket3 = Ticket.build({
				title: "concert2",
				price: 20,
				id: new mongoose.Types.ObjectId().toHexString(),
			});
			await ticket3.save();

			// Create orders for users
			await postOrderRequest({ ticketId: ticket1.id }, cookie);
			await postOrderRequest({ ticketId: ticket2.id }, cookie);
			await postOrderRequest({ ticketId: ticket3.id }, otherCookie);

			// Get the orders
			const responseForUser1 = await getOrdersRequest(cookie);
			const responseForUser2 = await getOrdersRequest(otherCookie);

			expect(responseForUser1.body.length).toEqual(2);
			expect(responseForUser2.body.length).toEqual(1);
		});

		it("should populate the ticket", async () => {
			const ticket = Ticket.build({
				title: "concert1",
				price: 20,
				id: new mongoose.Types.ObjectId().toHexString(),
			});
			await ticket.save();
			await postOrderRequest({ ticketId: ticket.id }, cookie);

			const res = await getOrdersRequest(cookie);
			expect(res.body[0].ticket).toBeDefined();
			expect(res.body[0].ticket.id).toEqual(ticket.id);
		});
	});
});
