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
};

export default config;
export const JWT_SECRET = config.jwtSecret;
