import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  status: number;
  isOperational: boolean;

  constructor(message: string, status = 500, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const routeNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`,
  });
};

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('ERROR 💥', err);

  // Default error properties
  const status = 'err' in err && err.status ? err.status : 500;
  const message = err.message || 'Something went wrong';
  const isOperational = 'isOperational' in err ? err.isOperational : false;

  // Operational, trusted errors: send message to client
  if (isOperational) {
    return res.status(status).json({
      status: 'error',
      message,
    });
  }

  // Programming or unknown errors: don't leak error details
  // Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};
