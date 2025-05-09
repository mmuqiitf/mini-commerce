import { Request, Response, NextFunction } from 'express';
import { addressRepository } from '../database/repositories/addressRepository';
import { countryService } from '../services/countryService';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const addressController = {
  async createAddress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'User ID is required' });
        return;
      }

      const { street, city, state, postal_code, country, is_default } =
        req.body;

      // Validate country using the service
      const isValidCountry = await countryService.isValidCountry(country);
      if (!isValidCountry) {
        res.status(400).json({ message: 'Invalid country name' });
        return;
      }

      const address = await addressRepository.create({
        user_id: userId,
        street,
        city,
        state,
        postal_code,
        country,
        is_default,
      });

      res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  },

  async getAddressById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const addressId = parseInt(req.params.id, 10);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'User ID is required' });
        return;
      }

      const address = await addressRepository.findById(addressId);

      if (!address) {
        res.status(404).json({ message: 'Address not found' });
        return;
      }

      // Security check: Users should only access their own addresses
      if (address.user_id !== userId) {
        res
          .status(403)
          .json({ message: 'Not authorized to access this address' });
        return;
      }

      res.status(200).json(address);
    } catch (error) {
      next(error);
    }
  },

  async getUserAddresses(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'User ID is required' });
        return;
      }

      const addresses = await addressRepository.findByUserId(userId);
      res.status(200).json(addresses);
    } catch (error) {
      next(error);
    }
  },

  async updateAddress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const addressId = parseInt(req.params.id, 10);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'User ID is required' });
        return;
      }

      // First, check if the address exists and belongs to the user
      const address = await addressRepository.findById(addressId);

      if (!address) {
        res.status(404).json({ message: 'Address not found' });
        return;
      }

      // Security check: Users should only update their own addresses
      if (address.user_id !== userId) {
        res
          .status(403)
          .json({ message: 'Not authorized to update this address' });
        return;
      }

      // Extract updated fields from request body
      const { street, city, state, postal_code, country, is_default } =
        req.body;

      // Validate country if it's being updated
      if (country && country !== address.country) {
        const isValidCountry = await countryService.isValidCountry(country);
        if (!isValidCountry) {
          res.status(400).json({ message: 'Invalid country name' });
          return;
        }
      }

      const updateResult = await addressRepository.update(addressId, {
        street,
        city,
        state,
        postal_code,
        country,
        is_default,
      });

      if (updateResult) {
        const updatedAddress = await addressRepository.findById(addressId);
        res.status(200).json(updatedAddress);
      } else {
        res
          .status(400)
          .json({ message: 'Failed to update address or no changes made' });
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteAddress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const addressId = parseInt(req.params.id, 10);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'User ID is required' });
        return;
      }

      // First, check if the address exists and belongs to the user
      const address = await addressRepository.findById(addressId);

      if (!address) {
        res.status(404).json({ message: 'Address not found' });
        return;
      }

      // Security check: Users should only delete their own addresses
      if (address.user_id !== userId) {
        res
          .status(403)
          .json({ message: 'Not authorized to delete this address' });
        return;
      }

      const deleteResult = await addressRepository.delete(addressId);

      if (deleteResult) {
        res.status(200).json({ message: 'Address deleted successfully' });
      } else {
        res.status(400).json({ message: 'Failed to delete address' });
      }
    } catch (error) {
      next(error);
    }
  },

  async setDefaultAddress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const addressId = parseInt(req.params.id, 10);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'User ID is required' });
        return;
      }

      // First, check if the address exists and belongs to the user
      const address = await addressRepository.findById(addressId);

      if (!address) {
        res.status(404).json({ message: 'Address not found' });
        return;
      }

      // Security check: Users should only modify their own addresses
      if (address.user_id !== userId) {
        res
          .status(403)
          .json({ message: 'Not authorized to modify this address' });
        return;
      }

      const result = await addressRepository.setDefault(addressId, userId);

      if (result) {
        res.status(200).json({ message: 'Default address set successfully' });
      } else {
        res.status(400).json({ message: 'Failed to set default address' });
      }
    } catch (error) {
      next(error);
    }
  },
};
