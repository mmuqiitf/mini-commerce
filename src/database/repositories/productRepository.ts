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
      const sql =
        'CALL generate_product_code(@new_code); SELECT @new_code as code;';
      const result = await executeQuery<any[]>(sql);
      return result[1][0].code;
    } catch (error) {
      // Fallback to manual code generation if stored procedure fails
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      // Get the highest sequence number for today
      const sequenceSql = `
        SELECT COALESCE(MAX(sequence_number), 0) + 1 AS next_sequence
        FROM products
        WHERE code LIKE ?
      `;
      const datePrefix = `P-${year}${month}${day}`;
      const sequenceResult = await executeQuery<any[]>(sequenceSql, [
        `${datePrefix}-%`,
      ]);

      const nextSequence = sequenceResult[0].next_sequence || 1;
      const sequenceFormatted = String(nextSequence).padStart(4, '0');

      return `${datePrefix}-${sequenceFormatted}`;
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

        // Extract sequence number from code (e.g., P-20250509-0001 -> 1)
        const sequencePart = productCode.split('-')[2];
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
    const sql = 'SELECT * FROM products LIMIT ? OFFSET ?';
    return executeQuery<Product[]>(sql, [limit, offset]);
  }

  // Find products by category
  async findByCategory(
    categoryId: number,
    limit = 50,
    offset = 0,
  ): Promise<Product[]> {
    const sql = 'SELECT * FROM products WHERE category_id = ? LIMIT ? OFFSET ?';
    return executeQuery<Product[]>(sql, [categoryId, limit, offset]);
  }

  // Search products by name
  async searchByName(name: string, limit = 50, offset = 0): Promise<Product[]> {
    const sql = 'SELECT * FROM products WHERE name LIKE ? LIMIT ? OFFSET ?';
    return executeQuery<Product[]>(sql, [`%${name}%`, limit, offset]);
  }

  // Get products with low stock
  async getLowStock(
    threshold = 10,
    limit = 50,
    offset = 0,
  ): Promise<Product[]> {
    const sql =
      'SELECT * FROM products WHERE stock_quantity < ? LIMIT ? OFFSET ?';
    return executeQuery<Product[]>(sql, [threshold, limit, offset]);
  }
}

export default new ProductRepository();
