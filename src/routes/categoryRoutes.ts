import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { handleValidationErrors } from '../middlewares/validationErrorHandler';
import { body, param } from 'express-validator';
import { protect } from '../middlewares/authMiddleware'; // Import the protect middleware

const router = Router();

// Apply the protect middleware to all category routes
router.use((req, res, next) => {
  protect(req, res, next);
});

router.post(
  '/',
  [
    body('name')
      .isString()
      .notEmpty()
      .withMessage('Name is required and must be a string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    body('parent_id')
      .optional()
      .isInt({ gt: 0 })
      .withMessage('Parent ID must be a positive integer'),
  ],
  handleValidationErrors,
  categoryController.createCategory,
);

router.get('/', categoryController.getAllCategories);

router.get(
  '/:id',
  [param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer')],
  handleValidationErrors,
  categoryController.getCategoryById,
);

router.put(
  '/:id',
  [
    param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
    body('name')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Name must be a non-empty string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    body('parent_id')
      .optional()
      .isInt({ gt: 0 })
      .withMessage('Parent ID must be a positive integer'),
  ],
  handleValidationErrors,
  categoryController.updateCategory,
);

router.delete(
  '/:id',
  [param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer')],
  handleValidationErrors,
  categoryController.deleteCategory,
);

export default router;
