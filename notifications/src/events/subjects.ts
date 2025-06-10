/**
 * Enum representing all possible event subjects in the system
 * Each subject represents a type of event that can be published
 */
export enum Subjects {
  OrderCreated = 'order:created',
  PaymentSucceeded = 'payment:succeeded',
}
