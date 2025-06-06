import {
	BaseListener,
	OrderCreatedEvent,
	Subjects,
} from "@h3nrzi-ticket/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import expirationQueue from "../../queues/expiration-queue";

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
	readonly subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
		// calculate the expiration delay
		const expirationDate = new Date(data.expiresAt);
		const currentDate = new Date();
		const expirationDelay = expirationDate.getTime() - currentDate.getTime();

		// add a job to the expiration queue
		await expirationQueue.add({ orderId: data.id }, { delay: expirationDelay });

		// ack the message
		msg.ack();
	}
}
