import { body, param, query } from 'express-validator';

export const productValidationRules = {
  createProduct: [
    body('name')
      .isString()
      .notEmpty()
      .withMessage('Product name is required')
      .trim(),

    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
      .trim(),

    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),

    body('quantity')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Stock quantity must be a non-negative integer'),

    body('category_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Category ID must be a positive integer'),

    body('code')
      .optional()
      .isString()
      .withMessage('Product code must be a string')
      .trim(),
  ],

  updateProduct: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Product ID must be a positive integer'),

    body('name')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Product name must be a non-empty string')
      .trim(),

    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
      .trim(),

    body('price')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),

    body('quantity')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Stock quantity must be a non-negative integer'),

    body('category_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Category ID must be a positive integer'),
  ],

  getProduct: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Product ID must be a positive integer'),
  ],

  getProductByCode: [
    param('code')
      .isString()
      .notEmpty()
      .withMessage('Product code is required')
      .trim(),
  ],

  getAllProducts: [
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),

    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Offset must be a non-negative integer'),

    query('category')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Category ID must be a positive integer'),
  ],

  updateStock: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Product ID must be a positive integer'),

    body('quantity').isInt().withMessage('Quantity must be an integer'),
  ],

  deleteProduct: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Product ID must be a positive integer'),
  ],

  getLowStockProducts: [
    query('threshold')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Threshold must be a non-negative integer'),

    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),

    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Offset must be a non-negative integer'),
  ],
};
