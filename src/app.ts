import express, { NextFunction, Response, Request } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import {
  routeNotFound,
  errorHandler,
  AppError,
} from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// Performance & utility middleware
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', routes);

// Error handling
app.use(routeNotFound);
app.use(
  (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  },
);

export default app;
