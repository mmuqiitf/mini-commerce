import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  database: {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    connectionLimit: number;
  };
  jwtSecret: string;
  email?: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    from: string;
  };
  notifications?: {
    adminEmail: string;
    lowStockThreshold: number;
    enableScheduled: boolean;
    cronSchedule: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mini_commerce',
    port: Number(process.env.DB_PORT) || 3306,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'notifications@mini-commerce.com',
  },
  notifications: {
    adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
    lowStockThreshold: Number(process.env.LOW_STOCK_THRESHOLD) || 10,
    enableScheduled: process.env.ENABLE_SCHEDULED_NOTIFICATIONS === 'true',
    cronSchedule: process.env.NOTIFICATION_SCHEDULE || '0 9 * * *',
  },
};

export default config;
export const JWT_SECRET = config.jwtSecret;
