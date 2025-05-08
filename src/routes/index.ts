import { Router } from 'express';
import itemRoutes from './itemRoutes';
// Import other route files here as your application grows

const router = Router();

// Register all routes
router.use('/items', itemRoutes);
// Register other routes here

export default router;
