import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';
import { requestIdMiddleware } from '../middleware/request-id.middleware.js';
import { requestLoggerMiddleware } from '../observability/request-logger.middleware.js';
import { notFoundMiddleware } from '../middleware/not-found.middleware.js';
import { errorMiddleware } from '../middleware/error.middleware.js';
import { hppMiddleware } from '../middleware/hpp.middleware.js';
import { rateLimiter } from '../middleware/rate-limiter.middleware.js';
import { getMetrics, incrementRequestCount } from '../observability/metrics.js';
import apiRouter from '../routes/index.js';
import healthRouter from '../health/health.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openapiPath = path.resolve(__dirname, '../../docs/api/openapi.json');

export function expressLoader(app) {
  // 1. Reverse proxy configuration
  app.set('trust proxy', config.server.trustProxy);

  // 2. Security-centric configurations
  app.use(helmet());
  app.use(cors({ origin: config.security.corsOrigin }));
  app.use(hppMiddleware);
  app.use(rateLimiter);

  // 3. Performance-centric middleware
  app.use(compression());

  // 4. Size constraints limiters and parsers
  app.use(requestIdMiddleware);
  app.use(express.json({ limit: config.server.bodyLimit }));
  app.use(express.urlencoded({ extended: true, limit: config.server.bodyLimit }));

  // 5. Metrics collection incrementer
  app.use((req, res, next) => {
    incrementRequestCount();
    next();
  });

  // 6. Observability trace logs
  app.use(requestLoggerMiddleware);

  // 7. System Health Check Probes
  app.use('/healthz', healthRouter);

  // 8. Prometheus scraping target
  app.get('/metrics', getMetrics);

  // 9. OpenAPI JSON metadata endpoint
  app.get('/api-docs', (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(openapiPath, 'utf-8'));
      res.json(data);
    } catch {
      res.status(500).json({ error: 'Failed to read API Documentation' });
    }
  });

  // 10. Mount Gateway Routes
  app.use('/api', apiRouter);

  // 11. Missing Route and global exception handlers
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
}
