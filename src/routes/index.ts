import { Router } from 'express';
import itemRoutes from './itemRoutes';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import addressRoutes from './addressRoutes';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';

const router = Router();

// Register all routes
router.use('/items', itemRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/addresses', addressRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;
