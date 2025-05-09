import schedule from 'node-schedule';
import logger from '../utils/logger';
import productRepository, {
  Product,
} from '../database/repositories/productRepository';
import emailService from './emailService';
import config from '../config/config';

/**
 * Service for scheduling tasks related to product notifications
 */
class SchedulerService {
  private lowStockThreshold: number;
  private lowStockJob: schedule.Job | null = null;

  constructor(lowStockThreshold = 10) {
    this.lowStockThreshold = lowStockThreshold;
  }

  /**
   * Check if the scheduler is active
   */
  isActive(): boolean {
    return this.lowStockJob !== null;
  }

  /**
   * Get the next scheduled invocation date
   */
  getNextInvocation(): Date | null {
    return this.lowStockJob ? this.lowStockJob.nextInvocation() : null;
  }

  /**
   * Get the current low stock threshold
   */
  getLowStockThreshold(): number {
    return this.lowStockThreshold;
  }
  /**
   * Start the low stock check scheduler
   * @param cronExpression Cron expression for scheduling (default: from config or every day at 9 AM)
   */
  startLowStockScheduler(cronExpression?: string) {
    // Use provided cron expression, or fallback to config, or use default
    const scheduleCron =
      cronExpression || config.notifications?.cronSchedule || '0 9 * * *';

    // Update threshold from config if available
    if (config.notifications?.lowStockThreshold) {
      this.lowStockThreshold = config.notifications.lowStockThreshold;
    }

    logger.info(`Starting low stock scheduler with cron: ${scheduleCron}`);
    logger.info(`Low stock threshold set to: ${this.lowStockThreshold} units`);

    // Cancel any existing job before creating a new one
    if (this.lowStockJob) {
      this.lowStockJob.cancel();
    }

    this.lowStockJob = schedule.scheduleJob(scheduleCron, async () => {
      try {
        logger.info('Running scheduled low stock check');
        await this.checkAndNotifyLowStock();
      } catch (error) {
        logger.error(`Error in scheduled low stock check: ${error}`);
      }
    });

    return this.lowStockJob;
  }

  /**
   * Stop the low stock check scheduler
   */
  stopLowStockScheduler() {
    if (this.lowStockJob) {
      logger.info('Stopping low stock scheduler');
      this.lowStockJob.cancel();
      this.lowStockJob = null;
      return true;
    }
    return false;
  }
  /**
   * Check for low stock products and send notifications
   */
  async checkAndNotifyLowStock(): Promise<Product[]> {
    try {
      const lowStockProducts = await productRepository.getLowStock(
        this.lowStockThreshold,
      );

      if (lowStockProducts.length > 0) {
        logger.info(
          `Found ${lowStockProducts.length} products with low stock (below ${this.lowStockThreshold})`,
        );

        // Log each low stock product
        for (const product of lowStockProducts) {
          logger.warn(
            `LOW STOCK ALERT: Product "${product.name}" (${product.code}) has only ${product.quantity} units remaining`,
          );
        }

        // Send email notification if admin email is configured
        if (config.notifications?.adminEmail) {
          try {
            await emailService.sendLowStockNotification(
              config.notifications.adminEmail,
              lowStockProducts,
              this.lowStockThreshold,
            );
            logger.info(
              `Low stock notification email sent to ${config.notifications.adminEmail}`,
            );
          } catch (emailError) {
            logger.error(
              `Failed to send low stock notification email: ${emailError}`,
            );
          }
        } else {
          logger.warn('No admin email configured for low stock notifications');
        }
      } else {
        logger.info(
          `No products with stock below ${this.lowStockThreshold} found`,
        );
      }

      return lowStockProducts;
    } catch (error) {
      logger.error(`Failed to check for low stock products: ${error}`);
      throw error;
    }
  }

  /**
   * Run an immediate check for low stock products
   */
  async runImmediateLowStockCheck(): Promise<Product[]> {
    logger.info('Running immediate low stock check');
    return this.checkAndNotifyLowStock();
  }

  /**
   * Update the low stock threshold
   */
  updateLowStockThreshold(newThreshold: number): void {
    this.lowStockThreshold = newThreshold;
    logger.info(`Updated low stock threshold to ${newThreshold}`);
  }
}

export default new SchedulerService();
