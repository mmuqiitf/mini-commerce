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
  stock_quantity: number;
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
  stock_quantity?: number;
  category_id?: number;
}

// Product repository class
class ProductRepository {
  // Generate unique product code with running number
  async generateProductCode(): Promise<string> {
    try {
      // Get the highest sequence number across all products
      const sequenceSql = `
        SELECT COALESCE(MAX(CAST(SUBSTRING_INDEX(code, '-', -1) AS SIGNED)), 0) + 1 AS next_sequence
        FROM products
        WHERE code LIKE 'P-%'
      `;

      const sequenceResult = await executeQuery<
        Array<{ next_sequence: number }> & RowDataPacket[]
      >(sequenceSql, []);

      // Get next sequence number, default to 1 if no products exist
      const nextSequence = sequenceResult[0]?.next_sequence || 1;

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
          stock_quantity, category_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        productCode,
        sequenceNumber,
        productData.name,
        productData.description || null,
        productData.price,
        productData.stock_quantity || 0,
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
      const newStock = Math.max(0, product.stock_quantity + quantity);

      // Update stock
      await connection.execute(
        'UPDATE products SET stock_quantity = ? WHERE id = ?',
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
    const sql = `SELECT * FROM products WHERE stock_quantity < ? LIMIT ${safeLimit} OFFSET ${safeOffset}`;
    return executeQuery<Product[]>(sql, [threshold]);
  }
}

export default new ProductRepository();
