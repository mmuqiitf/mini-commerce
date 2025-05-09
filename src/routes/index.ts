import { Router } from 'express';
import itemRoutes from './itemRoutes';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import addressRoutes from './addressRoutes';

const router = Router();

// Register all routes
router.use('/items', itemRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/addresses', addressRoutes);

export default router;
