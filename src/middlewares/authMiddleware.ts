import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import { User } from '../models/user'; // Assuming you have a User model

// Extend the Express Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
        id: number;
        name: string;
      }; // Adjust payload type as needed

      // You might want to fetch the user from the database here to ensure they still exist
      // For simplicity, we'll attach the decoded payload directly
      // req.user = await userRepository.findById(decoded.id);
      // if (!req.user) {
      //   return res.status(401).json({ message: 'Not authorized, user not found' });
      // }
      req.user = { id: decoded.id, name: decoded.name } as User; // Or however your User model is structured from the token

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
