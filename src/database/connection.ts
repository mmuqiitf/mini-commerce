import mysql from 'mysql2/promise';
import config from '../config/config';
import logger from '../utils/logger';

// Create a connection pool
const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  port: config.database.port,
  connectionLimit: config.database.connectionLimit,
  waitForConnections: true,
  queueLimit: 0,
});

// Function to execute raw queries
export async function executeQuery<T>(
  sql: string,
  params: any[] = [],
): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    logger.error(
      `Database query error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    throw error;
  }
}

// Function to execute a transaction
export async function executeTransaction<T>(
  callback: (connection: mysql.Connection) => Promise<T>,
): Promise<T> {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    logger.error(
      `Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    throw error;
  } finally {
    connection.release();
  }
}

// Test the connection
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    connection.release();
    logger.info('Database connection established successfully');
    return true;
  } catch (error) {
    logger.error(
      `Unable to connect to the database: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    return false;
  }
}

export default {
  executeQuery,
  executeTransaction,
  testConnection,
  pool,
};
