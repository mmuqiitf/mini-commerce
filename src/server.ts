import { Server } from 'http';
import app from './app';
import config from './config/config';
import logger from './utils/logger';
import { testConnection } from './database/connection';
import { isDatabaseReady } from './database/migrations';
import schedulerService from './services/schedulerService';

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Server variable that will be accessible throughout the module
let server: Server;

// Initialize database and start server using an immediately invoked async function
(async function initializeServer() {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      logger.error('Failed to connect to the database. Server will not start.');
      process.exit(1);
    }

    // Check if database is initialized
    const isReady = await isDatabaseReady();

    // Run migrations if needed
    if (!isReady) {
      logger.info(
        'Database not initialized. Please import the schama.sql file.',
      );
      // await runMigrations();
    } else {
      logger.info('Database already initialized');
    } // Start the server
    server = app.listen(config.port, () => {
      logger.info(
        `Server running in ${config.nodeEnv} mode on port ${config.port}`,
      );
      // Start the low stock scheduler based on configuration
      if (
        config.notifications?.enableScheduled ||
        config.nodeEnv === 'production'
      ) {
        schedulerService.startLowStockScheduler(
          config.notifications?.cronSchedule,
        );
        logger.info('Scheduled low stock notifications initialized');
      } else {
        logger.info(
          'Low stock scheduler not started (disabled in config or in development mode)',
        );
      }
    });
  } catch (error) {
    logger.error(
      `Server startup failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    process.exit(1);
  }
})();

// Unhandled rejection handler (promise rejections)
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);

  // Stop the scheduler if it's running
  schedulerService.stopLowStockScheduler();

  // Graceful shutdown - check if server is available
  if (server) {
    server.close(() => {
      logger.info('💥 Server closed due to unhandled rejection');
      process.exit(1);
    });
  } else {
    logger.info('💥 Server not initialized yet, exiting directly');
    process.exit(1);
  }
});

// SIGTERM handler
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');

  // Stop the scheduler if it's running
  schedulerService.stopLowStockScheduler();
  logger.info('Stopped scheduler jobs');

  if (server) {
    server.close(() => {
      logger.info('💥 Process terminated!');
    });
  } else {
    logger.info('💥 Process terminated before server was fully initialized!');
    process.exit(0);
  }
});
