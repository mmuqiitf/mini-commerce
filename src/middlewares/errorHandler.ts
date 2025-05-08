import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production';

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

// Async handler wrapper to avoid try/catch blocks in route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Generate request ID for error tracking
  const requestId = uuidv4();

  // Log error for debugging with request ID
  console.error(`ERROR 💥 [${requestId}]`, err);

  // Check if the error is an instance of AppError
  let status: number;
  if (err instanceof AppError) {
    status = err.status;
  } else {
    status = err.name === 'ValidationError' ? 400 : 500;
  }

  // Default error properties
  const message = err.message || 'Something went wrong';
  const isOperational = 'isOperational' in err ? err.isOperational : false;

  // Base response
  const errorResponse: any = {
    status: 'error',
    requestId,
  };

  // Operational, trusted errors: send message to client
  if (isOperational) {
    errorResponse.message = message;

    // In development, add more details
    if (!isProduction) {
      errorResponse.error = err;
      errorResponse.stack = err.stack;
    }

    return res.status(status).json(errorResponse);
  }

  // Programming or unknown errors: don't leak error details
  errorResponse.message = 'Something went wrong';

  // In development, add details for debugging
  if (!isProduction) {
    errorResponse.actualMessage = message;
    errorResponse.error = err;
    errorResponse.stack = err.stack;
  }

  return res.status(500).json(errorResponse);
};
