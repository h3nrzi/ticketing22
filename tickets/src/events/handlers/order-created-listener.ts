import {
	BaseListener,
	OrderCreatedEvent,
	Subjects,
} from "@h3nrzi-ticket/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { TicketModel } from "../../core/entities/ticket.entity";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
	readonly subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
		// Find the ticket that the order is reserving by the ticket id
		const ticket = await TicketModel.findById(data.ticket.id);

		// If no ticket, throw error
		if (!ticket) throw new Error("Ticket not found");

		// Mark the ticket as being reserved by setting its orderId property
		ticket.set({ orderId: data.id });

		// Save the ticket
		await ticket.save();

		// Publish a ticket:updated event
		await new TicketUpdatedPublisher(this.client).publish({
			id: ticket.id,
			title: ticket.title,
			price: ticket.price,
			userId: ticket.userId,
			orderId: ticket.orderId,
			version: ticket.version,
		});

		// Ack the message
		msg.ack();
	}
}
