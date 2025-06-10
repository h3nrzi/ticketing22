import { Message } from 'node-nats-streaming';
import { PaymentSucceededListener } from '../../events/handlers/payment-succeeded-listener';
import { NotificationService } from '../../services/notification-service';
import { PaymentSucceededEvent } from '../../events/handlers/payment-succeeded-listener'; // Assuming event interface is here
import { Subjects } from '../../events/subjects';
import { natsWrapper } from '../../config/nats-wrapper'; // To mock the client

// Mock NotificationService
jest.mock('../../services/notification-service');

// Mock NATS wrapper client
jest.mock('../../config/nats-wrapper', () => ({
  natsWrapper: {
    client: {
      // Minimal mock for NATS client
    },
  },
}));

const setup = () => {
  // Create an instance of the listener
  const listener = new PaymentSucceededListener(natsWrapper.client as any);

  // Create a mock data object
  const data: PaymentSucceededEvent['data'] = {
    id: 'payment123',
    orderId: 'order456',
    stripeId: 'stripe_abc',
    // Assuming the event structure might evolve to include userId or means to get it
  };

  // Create a mock message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
    getSubject: jest.fn(),
    getSequence: jest.fn(),
    getRawData: jest.fn(),
    getData: jest.fn(),
    getTimestampRaw: jest.fn(),
    getTimestamp: jest.fn(),
    isRedelivered: jest.fn(),
    getCrc32: jest.fn(),
  };

  return { listener, data, msg };
};

describe('PaymentSucceededListener', () => {
  beforeEach(() => {
    // Clear mock history before each test
    jest.clearAllMocks();
  });

  it('should instantiate NotificationService in constructor', () => {
    const { listener } = setup(); // Constructor is called during setup
    expect(NotificationService).toHaveBeenCalledTimes(1);
  });

  it('should call sendEmail on NotificationService with correct data and ack the message', async () => {
    const { listener, data, msg } = setup();

    const mockNotificationServiceInstance = (NotificationService as jest.Mock<NotificationService>).mock.instances[0];
    const mockSendEmail = mockNotificationServiceInstance.sendEmail as jest.Mock;

    // For this test, we use the placeholder userId as implemented in the listener
    const expectedUserId = 'user-placeholder@example.com';

    await listener.onMessage(data, msg);

    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expectedUserId,
      `Payment Succeeded for Order: ${data.orderId}`,
      `Your payment for order ${data.orderId} (Payment ID: ${data.id}) was successful. Thank you for your purchase!`
    );
    expect(msg.ack).toHaveBeenCalledTimes(1);
  });

  it('should log an error and not ack if sendEmail fails', async () => {
    const { listener, data, msg } = setup();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockNotificationServiceInstance = (NotificationService as jest.Mock<NotificationService>).mock.instances[0];
    const mockSendEmail = mockNotificationServiceInstance.sendEmail as jest.Mock;
    mockSendEmail.mockRejectedValueOnce(new Error('Email provider is down'));

    await listener.onMessage(data, msg);

    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Failed to send payment succeeded notification:', expect.any(Error));
    expect(msg.ack).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
