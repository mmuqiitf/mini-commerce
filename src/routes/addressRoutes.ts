import { Router } from 'express';
import { addressController } from '../controllers/addressController';
import { addressValidationRules } from '../middlewares/addressValidationRules';
import { protect } from '../middlewares/authMiddleware';
import { handleValidationErrors } from '../middlewares/validationErrorHandler';

const router = Router();

// All address routes require authentication
router.use((req, res, next) => {
  protect(req, res, next);
});

// Create a new address
router.post(
  '/',
  addressValidationRules.createAddress,
  handleValidationErrors,
  addressController.createAddress,
);

// Get all addresses for the current user
router.get('/', addressController.getUserAddresses);

// Get a specific address by ID
router.get(
  '/:id',
  addressValidationRules.getAddress,
  handleValidationErrors,
  addressController.getAddressById,
);

// Update an address
router.put(
  '/:id',
  addressValidationRules.updateAddress,
  handleValidationErrors,
  addressController.updateAddress,
);

// Delete an address
router.delete(
  '/:id',
  addressValidationRules.deleteAddress,
  handleValidationErrors,
  addressController.deleteAddress,
);

// Set an address as default
router.patch(
  '/:id/default',
  addressValidationRules.setDefaultAddress,
  handleValidationErrors,
  addressController.setDefaultAddress,
);

export default router;
