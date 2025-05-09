import { RowDataPacket, ResultSetHeader, Connection } from 'mysql2/promise';
import { executeQuery, executeTransaction } from '../connection';
import {
  Order,
  OrderItem,
  CreateOrderInput,
  OrderWithItems,
  OrderStatus,
} from '../../models/order';
import logger from '../../utils/logger';

const orderRepository = {
  /**
   * Generate a sequential order number with format ORD-DDMMYY-sequence
   * Uses the order_code_lock table to ensure uniqueness and prevent race conditions
   */
  async generateOrderNumber(connection: Connection): Promise<string> {
    // Get the current date in DDMMYY format
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const dateFormat = `${day}${month}${year}`;

    await connection.execute(`
          CREATE TABLE IF NOT EXISTS order_code_lock (
            id INT PRIMARY KEY,
            last_sequence INT NOT NULL DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `);

    // Get and increment the sequence number from the lock table
    await connection.query(
      `INSERT INTO order_code_lock (id, last_sequence) VALUES (1, 1)
       ON DUPLICATE KEY UPDATE last_sequence = last_sequence + 1`,
    );

    // Get the updated sequence number
    const [seqResult] = await connection.query<RowDataPacket[]>(
      `SELECT last_sequence FROM order_code_lock WHERE id = 1`,
    );

    const sequenceNumber = seqResult[0].last_sequence;

    // Format the sequence number to be at least 4 digits
    const formattedSeq = String(sequenceNumber).padStart(4, '0');

    return `ORD-${dateFormat}-${formattedSeq}`;
  },

  /**
   * Create a new order with items using transaction
   */
  async createOrder(
    userId: number,
    orderData: CreateOrderInput,
  ): Promise<OrderWithItems> {
    return executeTransaction(async (connection: Connection) => {
      try {
        // 1. Generate a unique order number
        const orderNumber = await this.generateOrderNumber(connection);

        // 2. Calculate total amount from the provided items
        let totalAmount = 0;
        const productIds = orderData.items.map((item) => item.product_id);

        // Get products details for price calculation
        const [products] = await connection.query<RowDataPacket[]>(
          'SELECT id, price FROM products WHERE id IN (?)',
          [productIds],
        );

        // Create a map of product prices for quick access
        const productPriceMap = products.reduce<Record<number, number>>(
          (acc, product) => {
            acc[product.id] = product.price;
            return acc;
          },
          {},
        );

        // Calculate total order amount and validate product existence
        orderData.items.forEach((item) => {
          const productPrice = productPriceMap[item.product_id];
          if (!productPrice) {
            throw new Error(`Product with id ${item.product_id} not found`);
          }
          totalAmount += productPrice * item.quantity;
        });

        // 3. Check if the address belongs to the user
        const [addressResult] = await connection.query<RowDataPacket[]>(
          'SELECT id FROM addresses WHERE id = ? AND user_id = ?',
          [orderData.address_id, userId],
        );

        if (addressResult.length === 0) {
          throw new Error('Address not found or does not belong to the user');
        }

        // 4. Insert order record
        const [orderResult] = await connection.query<ResultSetHeader>(
          `INSERT INTO orders (number, user_id, address_id, status, total_amount)
           VALUES (?, ?, ?, ?, ?)`,
          [
            orderNumber,
            userId,
            orderData.address_id,
            OrderStatus.PENDING,
            totalAmount,
          ],
        );

        const orderId = orderResult.insertId;

        // 5. Update product quantities and insert order items
        const orderItemInserts = [];

        for (const item of orderData.items) {
          // Check if product has enough stock
          const [stockResult] = await connection.query<RowDataPacket[]>(
            'SELECT quantity FROM products WHERE id = ? FOR UPDATE',
            [item.product_id],
          );

          if (stockResult.length === 0) {
            throw new Error(`Product with id ${item.product_id} not found`);
          }

          const currentStock = stockResult[0].quantity;
          if (currentStock < item.quantity) {
            throw new Error(`Not enough stock for product ${item.product_id}`);
          }

          // Update product stock
          await connection.query(
            'UPDATE products SET quantity = quantity - ? WHERE id = ?',
            [item.quantity, item.product_id],
          ); // Generate unique item number with format ITEM-DDMMYY-ORDERID-ITEMINDEX
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const year = String(now.getFullYear()).slice(-2);
          const dateFormat = `${day}${month}${year}`;
          const itemIndex = String(orderItemInserts.length + 1).padStart(
            3,
            '0',
          );
          const itemNumber: string = `ITEM-${dateFormat}-${orderId}-${itemIndex}`;

          // Insert order item
          const [itemResult] = await connection.query<ResultSetHeader>(
            `INSERT INTO order_items (number, order_id, product_id, quantity, price)
             VALUES (?, ?, ?, ?, ?)`,
            [
              itemNumber,
              orderId,
              item.product_id,
              item.quantity,
              productPriceMap[item.product_id],
            ],
          );

          orderItemInserts.push({
            id: itemResult.insertId,
            number: itemNumber,
            order_id: orderId,
            product_id: item.product_id,
            quantity: item.quantity,
            price: productPriceMap[item.product_id],
          });
        }

        // 6. Return the created order with items
        const order: OrderWithItems = {
          id: orderId,
          number: orderNumber,
          user_id: userId,
          address_id: orderData.address_id,
          status: OrderStatus.PENDING,
          total_amount: totalAmount,
          created_at: new Date(),
          updated_at: new Date(),
          items: orderItemInserts.map((item) => ({
            ...item,
            created_at: new Date(),
          })),
        };

        return order;
      } catch (error) {
        logger.error(
          `Order creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
        throw error;
      }
    });
  },

  /**
   * Get an order by ID with its items
   */
  async getOrderById(
    orderId: number,
    userId: number,
  ): Promise<OrderWithItems | null> {
    // Query the order
    const orders = await executeQuery<RowDataPacket[]>(
      `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
      [orderId, userId],
    );

    if (orders.length === 0) {
      return null;
    }

    const order = orders[0] as Order;

    // Query the order items
    const orderItems = await executeQuery<RowDataPacket[]>(
      `SELECT * FROM order_items WHERE order_id = ?`,
      [orderId],
    );

    return {
      ...order,
      items: orderItems as OrderItem[],
    };
  },

  /**
   * Get all orders for a user
   */
  async getUserOrders(userId: number): Promise<Order[]> {
    return executeQuery<RowDataPacket[]>(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
    ) as unknown as Order[];
  },

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: number,
    userId: number,
    status: OrderStatus,
  ): Promise<boolean> {
    const result = await executeQuery<ResultSetHeader>(
      `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
      [status, orderId, userId],
    );

    return result.affectedRows > 0;
  },
  /**
   * Cancel an order
   * This uses a transaction to update the order status and restore product quantities
   */
  async cancelOrder(orderId: number, userId: number): Promise<boolean> {
    return executeTransaction(async (connection: Connection) => {
      // Check if order exists and belongs to the user
      const [orderResult] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM orders WHERE id = ? AND user_id = ? AND status = ?`,
        [orderId, userId, OrderStatus.PENDING],
      );

      if (orderResult.length === 0) {
        throw new Error(
          'Order not found, does not belong to the user, or cannot be cancelled (must be in pending status)',
        );
      }

      // Get order items
      const [orderItems] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [orderId],
      );

      // Restore product quantities
      for (const item of orderItems) {
        await connection.query(
          `UPDATE products SET quantity = quantity + ? WHERE id = ?`,
          [item.quantity, item.product_id],
        );
      }

      // Update order status
      const [updateResult] = await connection.query<ResultSetHeader>(
        `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [OrderStatus.CANCELLED, orderId],
      );

      return updateResult.affectedRows > 0;
    });
  },

  /**
   * Get customer with the most purchases
   * @param limit Number of top customers to return (default: 1)
   * @returns Array of top customers with their order statistics
   */
  async getTopCustomers(limit = 1): Promise<any[]> {
    const sql = `
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(o.id) AS order_count,
        SUM(o.total_amount) AS total_spent,
        MIN(o.created_at) AS first_purchase_date,
        MAX(o.created_at) AS last_purchase_date
      FROM 
        users u
      INNER JOIN 
        orders o ON u.id = o.user_id
      WHERE 
        o.status != '${OrderStatus.CANCELLED}'
      GROUP BY 
        u.id, u.name, u.email
      ORDER BY 
        order_count DESC, total_spent DESC
      LIMIT ?
    `;

    return executeQuery<RowDataPacket[]>(sql, [limit]);
  },
};

export default orderRepository;
