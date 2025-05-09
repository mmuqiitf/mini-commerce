import { Router } from 'express';
import schedulerController from '../controllers/schedulerController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// All scheduler endpoints require authentication
router.use((req, res, next) => {
  protect(req, res, next);
});

router.post('/low-stock/start', schedulerController.startLowStockScheduler);
router.post('/low-stock/stop', schedulerController.stopLowStockScheduler);
router.get('/low-stock/check', schedulerController.checkLowStockNow);
router.get('/status', schedulerController.getSchedulerStatus);

export default router;
