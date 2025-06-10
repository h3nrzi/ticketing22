import { Message } from 'node-nats-streaming';
import { BaseListener, Event } from '../base-listener';
import { Subjects } from '../subjects';

// This assumes an OrderCreatedEvent interface exists or will be created in a common package.
// For now, we'll use a generic Event structure.
export interface OrderCreatedEvent extends Event {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: string;
    userId: string;
    expiresAt: string;
    version: number;
    ticket: {
      id: string;
      price: number;
    };
  };
}

import { NotificationService } from '../../services/notification-service';

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = 'notifications-service';
  private notificationService: NotificationService;

  constructor(client: Stan) {
    super(client);
    this.notificationService = new NotificationService();
  }

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log('Event data received (OrderCreated):', data);

    const { id, userId, ticket } = data;

    try {
      await this.notificationService.sendEmail(
        userId, // Assuming userId is an email or can be mapped to one
        `Order Created: ${id}`,
        `Your order for ticket "${ticket.id}" (Price: ${ticket.price}) has been successfully created.`
      );
      console.log(`Order created notification sent for order ${id} to user ${userId}`);
      msg.ack();
    } catch (error) {
      console.error('Failed to send order created notification:', error);
      // Decide if you want to nack the message for retry or handle differently
    }
  }
}
