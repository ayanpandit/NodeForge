import { validateEnv } from './env.js';

// Validate environment variables upon configuration module initialization
validateEnv();

export const config = Object.freeze({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN || '*',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
});
