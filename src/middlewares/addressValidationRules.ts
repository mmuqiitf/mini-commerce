import { body, check, param } from 'express-validator';
import { countryService } from '../services/countryService';

export const addressValidationRules = {
  createAddress: [
    body('street')
      .isString()
      .notEmpty()
      .withMessage('Street is required and must be a string')
      .trim(),

    body('city')
      .isString()
      .notEmpty()
      .withMessage('City is required and must be a string')
      .trim(),

    body('state')
      .optional()
      .isString()
      .withMessage('State must be a string')
      .trim(),

    body('postal_code')
      .isString()
      .notEmpty()
      .withMessage('Postal code is required and must be a string')
      .trim(),

    body('country')
      .isString()
      .notEmpty()
      .withMessage('Country is required and must be a string')
      .trim()
      .custom(async (value) => {
        const isValid = await countryService.isValidCountry(value);
        if (!isValid) {
          throw new Error('Invalid country name');
        }
        return true;
      }),

    body('is_default')
      .optional()
      .isBoolean()
      .withMessage('is_default must be a boolean value'),
  ],

  updateAddress: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Address ID must be a positive integer'),

    body('street')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Street must be a non-empty string')
      .trim(),

    body('city')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('City must be a non-empty string')
      .trim(),

    body('state')
      .optional()
      .isString()
      .withMessage('State must be a string')
      .trim(),

    body('postal_code')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Postal code must be a non-empty string')
      .trim(),

    body('country')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Country must be a non-empty string')
      .trim()
      .custom(async (value) => {
        if (value) {
          const isValid = await countryService.isValidCountry(value);
          if (!isValid) {
            throw new Error('Invalid country name');
          }
        }
        return true;
      }),

    body('is_default')
      .optional()
      .isBoolean()
      .withMessage('is_default must be a boolean value'),
  ],

  getAddress: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Address ID must be a positive integer'),
  ],

  deleteAddress: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Address ID must be a positive integer'),
  ],

  setDefaultAddress: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Address ID must be a positive integer'),
  ],
};
