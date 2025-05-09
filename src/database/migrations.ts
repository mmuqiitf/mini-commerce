import { readFileSync } from 'fs';
import path from 'path';
import { executeQuery } from './connection';
import logger from '../utils/logger';

/**
 * Function to run database migrations
 */
export async function runMigrations(): Promise<void> {
  try {
    // Read the schema SQL file
    const schemaSQL = readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

    // 1. First execute table creation statements
    // Split the SQL by the CREATE TABLE statements
    const tableStatements = schemaSQL
      .split('CREATE TABLE IF NOT EXISTS')
      .filter((stmt) => stmt.trim() !== '')
      .map(
        (stmt) =>
          `CREATE TABLE IF NOT EXISTS${stmt.split('CREATE PROCEDURE')[0]}`,
      );

    // Execute each table creation statement
    for (const statement of tableStatements) {
      if (statement.trim()) {
        try {
          await executeQuery(statement, []);
          logger.info(
            `Executed table creation: ${statement.substring(0, 50)}...`,
          );
        } catch (error) {
          logger.error(
            `Error executing statement: ${error instanceof Error ? error.message : 'Unknown error'}`,
          );
          logger.error(`Failed statement: ${statement.substring(0, 100)}...`);
          throw error;
        }
      }
    }

    // 2. Then execute the stored procedures separately
    if (schemaSQL.includes('CREATE PROCEDURE')) {
      const procedureMatch = schemaSQL.match(
        /CREATE PROCEDURE IF NOT EXISTS[\s\S]*?END;/g,
      );

      if (procedureMatch) {
        for (const procedure of procedureMatch) {
          try {
            await executeQuery(procedure, []);
            logger.info(
              `Executed stored procedure: ${procedure.substring(0, 50)}...`,
            );
          } catch (error) {
            logger.error(
              `Error creating stored procedure: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
            throw error;
          }
        }
      }
    }

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
