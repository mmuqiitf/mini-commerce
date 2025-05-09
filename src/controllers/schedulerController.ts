import { Request, Response, NextFunction } from 'express';
import schedulerService from '../services/schedulerService';

export default {
  /**
   * Start the low stock scheduler
   */
  async startLowStockScheduler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cronExpression = req.body.cronExpression || '0 9 * * *'; // Default to 9 AM daily
      const threshold = req.body.threshold || 10; // Default threshold

      // Update threshold if provided
      schedulerService.updateLowStockThreshold(threshold);

      // Start the scheduler
      const job = schedulerService.startLowStockScheduler(cronExpression);

      res.status(200).json({
        success: true,
        message: 'Low stock scheduler started successfully',
        details: {
          cronExpression,
          threshold,
          nextInvocation: job.nextInvocation(),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Stop the low stock scheduler
   */
  async stopLowStockScheduler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const stopped = schedulerService.stopLowStockScheduler();

      if (stopped) {
        res.status(200).json({
          success: true,
          message: 'Low stock scheduler stopped successfully',
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'No active low stock scheduler to stop',
        });
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Check low stock immediately (manual trigger)
   */
  async checkLowStockNow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const threshold = req.query.threshold
        ? parseInt(req.query.threshold as string)
        : undefined;

      // Update threshold if provided
      if (threshold !== undefined) {
        schedulerService.updateLowStockThreshold(threshold);
      }

      const lowStockProducts =
        await schedulerService.runImmediateLowStockCheck();

      res.status(200).json({
        success: true,
        message: 'Low stock check completed',
        count: lowStockProducts.length,
        data: lowStockProducts,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get scheduler status
   */
  async getSchedulerStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const status = {
        active: schedulerService.isActive(),
        nextInvocation: schedulerService.getNextInvocation(),
        threshold: schedulerService.getLowStockThreshold(),
      };

      res.status(200).json({
        success: true,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  },
};
