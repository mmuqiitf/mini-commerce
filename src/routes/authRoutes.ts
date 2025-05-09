import { Router } from 'express';
import { authController } from '../controllers/authController';
import {
  registrationValidationRules,
  loginValidationRules,
} from '../middlewares/authValidationRules';
import { handleValidationErrors } from '../middlewares/validationErrorHandler';

const router = Router();

router.post(
  '/register',
  registrationValidationRules,
  handleValidationErrors,
  authController.register,
);

router.post(
  '/login',
  loginValidationRules,
  handleValidationErrors,
  authController.login,
);

export default router;
