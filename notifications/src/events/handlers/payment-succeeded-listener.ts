import { Message } from 'node-nats-streaming';
import { BaseListener, Event } from '../base-listener';
import { Subjects } from '../subjects';

// This assumes a PaymentSucceededEvent interface exists or will be created in a common package.
// For now, we'll use a generic Event structure.
export interface PaymentSucceededEvent extends Event {
  subject: Subjects.PaymentSucceeded;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
    // Add other relevant payment details
  };
}

import { NotificationService } from '../../services/notification-service';

export class PaymentSucceededListener extends BaseListener<PaymentSucceededEvent> {
  readonly subject = Subjects.PaymentSucceeded;
  queueGroupName = 'notifications-service';
  private notificationService: NotificationService;

  constructor(client: Stan) {
    super(client);
    this.notificationService = new NotificationService();
  }

  async onMessage(data: PaymentSucceededEvent['data'], msg: Message) {
    console.log('Event data received (PaymentSucceeded):', data);

    const { id, orderId } = data; // Assuming order contains userId or can be fetched

    try {
      // TODO: Fetch order details to get userId if not directly in payment event
      const userId = 'user-placeholder@example.com'; // Placeholder

      await this.notificationService.sendEmail(
        userId,
        `Payment Succeeded for Order: ${orderId}`,
        `Your payment for order ${orderId} (Payment ID: ${id}) was successful. Thank you for your purchase!`
      );
      console.log(`Payment succeeded notification sent for order ${orderId}`);
      msg.ack();
    } catch (error) {
      console.error('Failed to send payment succeeded notification:', error);
      // Decide if you want to nack the message for retry or handle differently
    }
  }
}
