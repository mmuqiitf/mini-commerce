import { executeQuery, executeTransaction } from '../connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// Product interface
export interface Product extends RowDataPacket {
  id: number;
  code: string;
  sequence_number: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  category_id: number | null;
  created_at: Date;
  updated_at: Date;
}

// CreateProduct interface - for product creation
export interface CreateProduct {
  code?: string; // Optional because we can generate it
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  category_id?: number;
}

// Product repository class
class ProductRepository {
  // Generate unique product code with running number and handle race conditions
  async generateProductCode(): Promise<string> {
    // Use a transaction to prevent race conditions
    return executeTransaction(async (connection) => {
      try {
        // Create a lock table if it doesn't exist
        // This will be used as a mutex lock for product code generation
        await connection.execute(`
          CREATE TABLE IF NOT EXISTS product_code_lock (
            id INT PRIMARY KEY,
            last_sequence INT NOT NULL DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `);

        // Insert initial record if it doesn't exist
        await connection.execute(`
          INSERT IGNORE INTO product_code_lock (id, last_sequence) VALUES (1, 0)
        `);

        // Get and update the next sequence with row-level locking
        const [lockResult] = await connection.execute(`
          SELECT last_sequence
          FROM product_code_lock
          WHERE id = 1
          FOR UPDATE
        `);

        // Get current sequence
        const currentSequence = (lockResult as any)[0]?.last_sequence || 0;
        const nextSequence = currentSequence + 1;

        // Update the sequence in the lock table
        await connection.execute(
          `
          UPDATE product_code_lock
          SET last_sequence = ?
          WHERE id = 1
        `,
          [nextSequence],
        );

        // Format the sequence number with leading zeros (P-0001)
        const sequenceFormatted = String(nextSequence).padStart(4, '0');

        // Return the formatted product code
        return `P-${sequenceFormatted}`;
      } catch (error) {
        console.error('Error generating product code:', error);
        // In case of any error, generate a fallback code
        const timestamp = Date.now();
        return `P-${timestamp.toString().substring(timestamp.toString().length - 4)}`;
      }
    });
  }
  // Create a new product with transaction to handle race conditions
  async create(productData: CreateProduct): Promise<Product> {
    return executeTransaction(async (connection) => {
      // Generate product code if not provided
      let productCode = productData.code;
      let sequenceNumber = 1;

      if (!productCode) {
        productCode = await this.generateProductCode();

        // Extract sequence number from code (e.g., P-0001 -> 1)
        const sequencePart = productCode.split('-')[1];
        sequenceNumber = parseInt(sequencePart, 10);
      }
      const sql = `
        INSERT INTO products (
          code, sequence_number, name, description, price, 
          quantity, category_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        productCode,
        sequenceNumber,
        productData.name,
        productData.description || null,
        productData.price,
        productData.quantity || 0,
        productData.category_id || null,
      ];

      const [result] = await connection.execute<ResultSetHeader>(sql, params);

      // Fetch the created product
      const [products] = await connection.execute<Product[]>(
        'SELECT * FROM products WHERE id = ?',
        [result.insertId],
      );

      return products[0];
    });
  }

  // Find product by ID
  async findById(id: number): Promise<Product | null> {
    const sql = 'SELECT * FROM products WHERE id = ? LIMIT 1';
    const results = await executeQuery<Product[]>(sql, [id]);

    return results.length > 0 ? results[0] : null;
  }

  // Find product by code
  async findByCode(code: string): Promise<Product | null> {
    const sql = 'SELECT * FROM products WHERE code = ? LIMIT 1';
    const results = await executeQuery<Product[]>(sql, [code]);

    return results.length > 0 ? results[0] : null;
  }

  // Update product
  async update(
    id: number,
    productData: Partial<CreateProduct>,
  ): Promise<Product | null> {
    // Build dynamic SET clause and params
    const entries = Object.entries(productData);

    if (entries.length === 0) return this.findById(id);

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const params = [...entries.map(([_, value]) => value), id];

    const sql = `UPDATE products SET ${setClause} WHERE id = ?`;
    await executeQuery<ResultSetHeader>(sql, params);

    return this.findById(id);
  }

  // Update product stock (with optimistic locking to prevent race conditions)
  async updateStock(id: number, quantity: number): Promise<Product | null> {
    return executeTransaction(async (connection) => {
      // First get current product with stock
      const [products] = await connection.execute<Product[]>(
        'SELECT * FROM products WHERE id = ? FOR UPDATE',
        [id],
      );

      if (products.length === 0) {
        throw new Error('Product not found');
      }

      const product = products[0];
      const newStock = Math.max(0, product.quantity + quantity);

      // Update stock
      await connection.execute(
        'UPDATE products SET quantity = ? WHERE id = ?',
        [newStock, id],
      );

      // Fetch updated product
      const [updatedProducts] = await connection.execute<Product[]>(
        'SELECT * FROM products WHERE id = ?',
        [id],
      );

      return updatedProducts[0];
    });
  }

  // Delete product
  async delete(id: number): Promise<boolean> {
    const sql = 'DELETE FROM products WHERE id = ?';
    const result = await executeQuery<ResultSetHeader>(sql, [id]);

    return result.affectedRows > 0;
  }
  // Get all products
  async findAll(limit = 50, offset = 0): Promise<Product[]> {
    // For LIMIT and OFFSET, we need to escape them manually as integers
    // as MySQL doesn't support placeholders for these clauses
    const sql = `SELECT * FROM products LIMIT ${parseInt(String(limit), 10)} OFFSET ${parseInt(String(offset), 10)}`;
    return executeQuery<Product[]>(sql, []);
  }
  // Find products by category
  async findByCategory(
    categoryId: number,
    limit = 50,
    offset = 0,
  ): Promise<Product[]> {
    // Safely parse limit and offset as integers
    const safeLimit = parseInt(String(limit), 10);
    const safeOffset = parseInt(String(offset), 10);
    const sql = `SELECT * FROM products WHERE category_id = ? LIMIT ${safeLimit} OFFSET ${safeOffset}`;
    return executeQuery<Product[]>(sql, [categoryId]);
  }

  // Search products by name
  async searchByName(name: string, limit = 50, offset = 0): Promise<Product[]> {
    // Safely parse limit and offset as integers
    const safeLimit = parseInt(String(limit), 10);
    const safeOffset = parseInt(String(offset), 10);
    const sql = `SELECT * FROM products WHERE name LIKE ? LIMIT ${safeLimit} OFFSET ${safeOffset}`;
    return executeQuery<Product[]>(sql, [`%${name}%`]);
  }

  // Get products with low stock
  async getLowStock(
    threshold = 10,
    limit = 50,
    offset = 0,
  ): Promise<Product[]> {
    // Safely parse limit and offset as integers
    const safeLimit = parseInt(String(limit), 10);
    const safeOffset = parseInt(String(offset), 10);
    const sql = `SELECT * FROM products WHERE quantity < ? LIMIT ${safeLimit} OFFSET ${safeOffset}`;
    return executeQuery<Product[]>(sql, [threshold]);
  }
}

export default new ProductRepository();
