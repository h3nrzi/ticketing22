import { Message } from 'node-nats-streaming';
import { OrderCreatedListener } from '../../events/handlers/order-created-listener';
import { NotificationService } from '../../services/notification-service';
import { OrderCreatedEvent } from '../../events/handlers/order-created-listener'; // Assuming event interface is here
import { Subjects } from '../../events/subjects';
import { natsWrapper } from '../../config/nats-wrapper'; // To mock the client

// Mock NotificationService
jest.mock('../../services/notification-service');

// Mock NATS wrapper client
jest.mock('../../config/nats-wrapper', () => ({
  natsWrapper: {
    client: {
      // We don't need a full Stan mock for these tests,
      // as we are calling onMessage directly.
      // If listener setup (subscribe) was tested, more mocking would be needed.
    },
  },
}));

const setup = () => {
  // Create an instance of the listener
  // NATS client is mocked, so we can pass undefined or a minimal mock
  const listener = new OrderCreatedListener(natsWrapper.client as any);

  // Create a mock data object
  const data: OrderCreatedEvent['data'] = {
    id: 'order123',
    status: 'created',
    userId: 'user456',
    expiresAt: new Date().toISOString(),
    version: 0,
    ticket: {
      id: 'ticket789',
      price: 50,
    },
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

describe('OrderCreatedListener', () => {
  it('should instantiate NotificationService in constructor', () => {
    const { listener } = setup();
    expect(NotificationService).toHaveBeenCalledTimes(1);
  });

  it('should call sendEmail on NotificationService with correct data and ack the message', async () => {
    const { listener, data, msg } = setup();

    // Get the mocked sendEmail function instance
    const mockNotificationServiceInstance = (NotificationService as jest.Mock<NotificationService>).mock.instances[0];
    const mockSendEmail = mockNotificationServiceInstance.sendEmail as jest.Mock;

    await listener.onMessage(data, msg);

    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledWith(
      data.userId,
      `Order Created: ${data.id}`,
      `Your order for ticket "${data.ticket.id}" (Price: ${data.ticket.price}) has been successfully created.`
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
    expect(console.error).toHaveBeenCalledWith('Failed to send order created notification:', expect.any(Error));
    expect(msg.ack).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
