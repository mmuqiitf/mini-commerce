import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../database/repositories/userRepository';
import {
  RegisterRequestBody,
  LoginRequestBody,
  AuthResponse,
} from '../types/auth';
import { User } from '../models/user';
import { JWT_SECRET } from '../config/config';

export const authController = {
  async register(
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response<AuthResponse | { message: string }>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, phone, password, name } = req.body;

      if (!password || !name) {
        res.status(400).json({ message: 'Name and password are required' });
        return;
      }

      if (!email && !phone) {
        res
          .status(400)
          .json({ message: 'Either email or phone must be provided' });
        return;
      }

      let existingUser;
      if (email) {
        existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
          res
            .status(400)
            .json({ message: 'User with this email already exists' });
          return;
        }
      }

      if (phone) {
        existingUser = await userRepository.findByPhone(phone);
        if (existingUser) {
          res
            .status(400)
            .json({ message: 'User with this phone already exists' });
          return;
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userRepository.create({
        email: email || null,
        phone: phone || null,
        password: hashedPassword,
        name,
      });

      const token = jwt.sign(
        { id: newUser.id, name: newUser.name },
        JWT_SECRET,
        { expiresIn: '1h' },
      );

      res.status(201).json({
        token,
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(
    req: Request<{}, {}, LoginRequestBody>,
    res: Response<AuthResponse | { message: string }>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, phone, password } = req.body;

      if (!password) {
        res.status(400).json({ message: 'Password is required' });
        return;
      }

      if (!email && !phone) {
        res.status(400).json({
          message: 'Either email or phone must be provided for login',
        });
        return;
      }

      let user: User | null = null;
      if (email) {
        user = await userRepository.findByEmail(email);
      }

      if (!user && phone) {
        user = await userRepository.findByPhone(phone);
      }

      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};
