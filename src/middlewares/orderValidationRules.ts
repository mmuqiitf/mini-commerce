import { body, param } from 'express-validator';
import { OrderStatus } from '../models/order';

export const createOrderValidationRules = [
  body('address_id')
    .isInt({ min: 1 })
    .withMessage('A valid address ID is required'),

  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must have at least one item'),

  body('items.*.product_id')
    .isInt({ min: 1 })
    .withMessage('Each item must have a valid product ID'),

  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
];

export const orderIdValidationRule = [
  param('id').isInt({ min: 1 }).withMessage('Invalid order ID'),
];

export const updateOrderStatusValidationRules = [
  param('id').isInt({ min: 1 }).withMessage('Invalid order ID'),

  body('status')
    .isIn(Object.values(OrderStatus))
    .withMessage(
      `Status must be one of: ${Object.values(OrderStatus).join(', ')}`,
    ),
];

export default {
  createOrderValidationRules,
  orderIdValidationRule,
  updateOrderStatusValidationRules,
};
