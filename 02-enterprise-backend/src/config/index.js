import { validateEnv } from './env.js';

// Verify and validate env configurations at load time to trigger a fail-fast startup behavior
validateEnv();

export const config = Object.freeze({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
    bodyLimit: process.env.BODY_LIMIT || '10kb',
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN || '*',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
});
