import { logger } from './logger.js';

export function requestLoggerMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: duration,
      requestId: req.id,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  });

  next();
}
