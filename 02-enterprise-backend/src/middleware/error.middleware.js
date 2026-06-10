import { config } from '../config/index.js';

// eslint-disable-next-line no-unused-vars
export function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProduction = config.server.env === 'production';

  const response = {
    status: 'error',
    message: err.isOperational || !isProduction ? err.message : 'Internal Server Error',
    requestId: req.id,
  };

  if (!isProduction) {
    response.stack = err.stack;
  }

  // Intercept and log system failures based on status levels
  if (!err.isOperational) {
    console.error(`[Fatal Error] Request ID: ${req.id} - Stack:`, err.stack || err);
  } else if (statusCode >= 500) {
    console.error(`[Error] Request ID: ${req.id} - Stack:`, err.stack || err);
  }

  res.status(statusCode).json(response);
}
