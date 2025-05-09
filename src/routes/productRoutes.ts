import { Router } from 'express';
import { productController } from '../controllers/productController';
import { productValidationRules } from '../middlewares/productValidationRules';
import { handleValidationErrors } from '../middlewares/validationErrorHandler';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Public routes - no authentication required
router.get(
  '/',
  productValidationRules.getAllProducts,
  handleValidationErrors,
  productController.getAllProducts,
);

router.get(
  '/low-stock',
  productValidationRules.getLowStockProducts,
  handleValidationErrors,
  productController.getLowStockProducts,
);

router.get(
  '/:id',
  productValidationRules.getProduct,
  handleValidationErrors,
  productController.getProductById,
);

router.get(
  '/code/:code',
  productValidationRules.getProductByCode,
  handleValidationErrors,
  productController.getProductByCode,
);

// Protected routes - authentication required
router.use((req, res, next) => {
  protect(req, res, next);
});

router.post(
  '/',
  productValidationRules.createProduct,
  handleValidationErrors,
  productController.createProduct,
);

router.put(
  '/:id',
  productValidationRules.updateProduct,
  handleValidationErrors,
  productController.updateProduct,
);

router.patch(
  '/:id/stock',
  productValidationRules.updateStock,
  handleValidationErrors,
  productController.updateProductStock,
);

router.delete(
  '/:id',
  productValidationRules.deleteProduct,
  handleValidationErrors,
  productController.deleteProduct,
);

export default router;
