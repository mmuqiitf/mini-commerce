import { Router } from 'express';
import orderController from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';
import { handleValidationErrors } from '../middlewares/validationErrorHandler';
import {
  createOrderValidationRules,
  orderIdValidationRule,
  updateOrderStatusValidationRules,
} from '../middlewares/orderValidationRules';

const router = Router();

router.use((req, res, next) => {
  protect(req, res, next);
});

/**
 * @route POST /orders
 * @desc Create a new order (uses transaction for multiple DB operations)
 * @access Private
 */
router.post(
  '/',
  createOrderValidationRules,
  handleValidationErrors,
  orderController.createOrder,
);

/**
 * @route GET /orders
 * @desc Get all orders for the authenticated user
 * @access Private
 */
router.get('/', orderController.getUserOrders);

/**
 * @route GET /orders/:id
 * @desc Get order details by ID
 * @access Private
 */
router.get(
  '/:id',

  orderIdValidationRule,
  handleValidationErrors,
  orderController.getOrderById,
);

/**
 * @route PUT /orders/:id/status
 * @desc Update order status
 * @access Private
 */
router.put(
  '/:id/status',

  updateOrderStatusValidationRules,
  handleValidationErrors,
  orderController.updateOrderStatus,
);

/**
 * @route POST /orders/:id/cancel
 * @desc Cancel an order (uses transaction for multiple DB operations)
 * @access Private
 */
router.post(
  '/:id/cancel',

  orderIdValidationRule,
  handleValidationErrors,
  orderController.cancelOrder,
);

export default router;
