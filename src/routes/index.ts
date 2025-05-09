import { Router } from 'express';
import itemRoutes from './itemRoutes';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';

const router = Router();

// Register all routes
router.use('/items', itemRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);

export default router;
