import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { config } from '../config/index.js';
import { requestIdMiddleware } from '../middleware/request-id.middleware.js';
import { requestLoggerMiddleware } from '../observability/request-logger.middleware.js';
import { notFoundMiddleware } from '../middleware/not-found.middleware.js';
import { errorMiddleware } from '../middleware/error.middleware.js';
import apiRouter from '../routes/index.js';
import healthRouter from '../health/health.routes.js';

export function expressLoader(app) {
  // 1. Security-centric configurations
  app.use(helmet());
  app.use(cors({ origin: config.security.corsOrigin }));

  // 2. Performance-centric middleware
  app.use(compression());

  // 3. Size constraints limiters and parsers
  app.use(requestIdMiddleware);
  app.use(express.json({ limit: config.server.bodyLimit }));
  app.use(express.urlencoded({ extended: true, limit: config.server.bodyLimit }));

  // 4. Observability trace logs
  app.use(requestLoggerMiddleware);

  // 5. System Health Check Probes
  app.use('/healthz', healthRouter);

  // 6. Mount Gateway Routes
  app.use('/api', apiRouter);

  // 7. Missing Route and global exception handlers
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
}
