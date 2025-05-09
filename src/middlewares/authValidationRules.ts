import { body } from 'express-validator';

export const registrationValidationRules = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  // Conditional validation for email or phone
  body().custom((value, { req }) => {
    const { email, phone } = req.body;
    if (!email && !phone) {
      throw new Error('Either email or phone must be provided');
    }
    if (
      (email && typeof email !== 'string') ||
      (email && !email.includes('@'))
    ) {
      throw new Error('Please provide a valid email address');
    }
    if (
      (phone && typeof phone !== 'string') ||
      (phone && !/^\+?[1-9]\d{1,14}$/.test(phone))
    ) {
      // Basic E.164 format check
      throw new Error('Please provide a valid phone number');
    }
    return true;
  }),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('phone').optional().isString().trim().escape(), // Add more specific phone validation if needed
];

export const loginValidationRules = [
  body('password').notEmpty().withMessage('Password is required'),
  // Conditional validation for email or phone
  body().custom((value, { req }) => {
    const { email, phone } = req.body;
    if (!email && !phone) {
      throw new Error('Either email or phone must be provided for login');
    }
    if (
      (email && typeof email !== 'string') ||
      (email && !email.includes('@'))
    ) {
      throw new Error('Please provide a valid email address for login');
    }
    if (
      (phone && typeof phone !== 'string') ||
      (phone && !/^\+?[1-9]\d{1,14}$/.test(phone))
    ) {
      // Basic E.164 format check
      throw new Error('Please provide a valid phone number for login');
    }
    return true;
  }),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format for login')
    .normalizeEmail(),
  body('phone').optional().isString().trim().escape(),
];
