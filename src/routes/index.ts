import { Router } from 'express';
import itemRoutes from './itemRoutes';
import authRoutes from './authRoutes';
// Import other route files here as your application grows

const router = Router();

// Register all routes
router.use('/items', itemRoutes);
router.use('/auth', authRoutes);
// Register other routes here

export default router;
