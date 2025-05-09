import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { CreateOrderInput, OrderStatus } from '../models/order';
import logger from '../utils/logger';
import orderRepository from '../database/repositories/orderRepository';

export const orderController = {
  /**
   * Create a new order
   * This endpoint uses transactions to ensure data consistency when:
   * 1. Creating the order record
   * 2. Creating order item records
   * 3. Updating product quantities
   */
  async createOrder(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const orderData: CreateOrderInput = req.body;

      if (!orderData.items || orderData.items.length === 0) {
        res.status(400).json({
          success: false,
          message: 'Order must contain at least one item',
        });
        return;
      }

      const order = await orderRepository.createOrder(userId, orderData);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      logger.error(
        `Order creation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      next(error);
    }
  },

  /**
   * Get user's orders
   */
  async getUserOrders(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const orders = await orderRepository.getUserOrders(userId);

      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get order details by ID
   */
  async getOrderById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const orderId = parseInt(req.params.id, 10);
      if (isNaN(orderId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID',
        });
        return;
      }

      const order = await orderRepository.getOrderById(orderId, userId);

      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update order status
   */
  async updateOrderStatus(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const orderId = parseInt(req.params.id, 10);
      if (isNaN(orderId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID',
        });
        return;
      }

      const { status } = req.body;
      if (!status || !Object.values(OrderStatus).includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order status',
        });
        return;
      }

      const updated = await orderRepository.updateOrderStatus(
        orderId,
        userId,
        status,
      );

      if (!updated) {
        res.status(404).json({
          success: false,
          message: 'Order not found or could not be updated',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
  /**
   * Cancel an order
   * This endpoint uses transactions to ensure data consistency when:
   * 1. Updating the order status
   * 2. Restoring product quantities
   */
  async cancelOrder(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const orderId = parseInt(req.params.id, 10);
      if (isNaN(orderId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID',
        });
        return;
      }

      const cancelled = await orderRepository.cancelOrder(orderId, userId);

      if (!cancelled) {
        res.status(404).json({
          success: false,
          message: 'Order not found or could not be cancelled',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Order cancelled successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get customer with the most purchases
   * This endpoint returns report data about the top purchasers
   */
  async getTopCustomers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 1;

      // Validate limit parameter
      if (isNaN(limit) || limit < 1 || limit > 100) {
        res.status(400).json({
          success: false,
          message: 'Limit must be a number between 1 and 100',
        });
        return;
      }

      const topCustomers = await orderRepository.getTopCustomers(limit);

      res.status(200).json({
        success: true,
        count: topCustomers.length,
        data: topCustomers,
      });
    } catch (error) {
      logger.error(`Error getting top customers: ${error}`);
      next(error);
    }
  },
};

export default orderController;
