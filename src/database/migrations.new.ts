import { executeQuery } from './connection';
import logger from '../utils/logger';

/**
 * Function to run database migrations
 */
export async function runMigrations(): Promise<void> {
  try {
    // Instead of trying to parse the SQL file, let's execute each table creation statement directly

    // 1. Create users table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        phone VARCHAR(20),
        role ENUM('customer', 'admin') DEFAULT 'customer',
        auth_type ENUM('local', 'google', 'facebook') DEFAULT 'local',
        auth_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE INDEX auth_unique (auth_type, auth_id)
      )
    `,
      [],
    );
    logger.info('Created users table');

    // 2. Create categories table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        parent_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `,
      [],
    );
    logger.info('Created categories table');

    // 3. Create products table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        sequence_number INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT NOT NULL DEFAULT 0,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `,
      [],
    );
    logger.info('Created products table');

    // 4. Create product_images table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `,
      [],
    );
    logger.info('Created product_images table');

    // 5. Create addresses table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100),
        postal_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL,
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `,
      [],
    );
    logger.info('Created addresses table');

    // 6. Create orders table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        address_id INT NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        total_amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE RESTRICT
      )
    `,
      [],
    );
    logger.info('Created orders table');

    // 7. Create order_items table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
      )
    `,
      [],
    );
    logger.info('Created order_items table');

    // 8. Create task_schedule table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS task_schedule (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_name VARCHAR(100) NOT NULL,
        task_type ENUM('one-time', 'recurring') NOT NULL,
        status ENUM('pending', 'running', 'completed', 'failed') DEFAULT 'pending',
        schedule_time TIMESTAMP NOT NULL,
        last_run_time TIMESTAMP NULL,
        data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `,
      [],
    );
    logger.info('Created task_schedule table');

    // 9. Create api_requests table
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS api_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        endpoint VARCHAR(255) NOT NULL,
        method ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH') NOT NULL,
        request_data JSON,
        response_data JSON,
        status_code INT,
        user_id INT,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `,
      [],
    );
    logger.info('Created api_requests table');

    // 10. Create stored procedure
    await executeQuery(
      `
      CREATE PROCEDURE IF NOT EXISTS generate_product_code(OUT new_code VARCHAR(50))
      BEGIN
        DECLARE year_prefix VARCHAR(4);
        DECLARE month_prefix VARCHAR(2);
        DECLARE day_prefix VARCHAR(2);
        DECLARE next_sequence INT;
        
        -- Get current date components
        SET year_prefix = DATE_FORMAT(NOW(), '%Y');
        SET month_prefix = DATE_FORMAT(NOW(), '%m');
        SET day_prefix = DATE_FORMAT(NOW(), '%d');
        
        -- Find the next sequence number for today's date
        SELECT COALESCE(MAX(sequence_number), 0) + 1 INTO next_sequence
        FROM products
        WHERE code LIKE CONCAT('P-', year_prefix, month_prefix, day_prefix, '-%');
        
        -- Generate the code in format P-YYYYMMDD-XXXX where XXXX is the sequence
        SET new_code = CONCAT('P-', year_prefix, month_prefix, day_prefix, '-', LPAD(next_sequence, 4, '0'));
      END
    `,
      [],
    );
    logger.info('Created generate_product_code stored procedure');

    logger.info('Database migrations completed successfully');
  } catch (error) {
    logger.error(
      `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    throw error;
  }
}

/**
 * Function to check if database is ready (tables exist)
 */
export async function isDatabaseReady(): Promise<boolean> {
  try {
    const result = await executeQuery<any[]>('SHOW TABLES');
    return Array.isArray(result) && result.length > 0;
  } catch (error) {
    logger.error(
      `Database check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    return false;
  }
}

export default {
  runMigrations,
  isDatabaseReady,
};
