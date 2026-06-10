/* eslint-disable no-console */
import { correlationContext } from './correlation.js';

export const logger = {
  info(message, meta = {}) {
    this.log('info', message, meta);
  },
  warn(message, meta = {}) {
    this.log('warn', message, meta);
  },
  error(message, meta = {}) {
    this.log('error', message, meta);
  },
  debug(message, meta = {}) {
    this.log('debug', message, meta);
  },
  log(level, message, meta = {}) {
    const isProduction = process.env.NODE_ENV === 'production';
    const context = correlationContext.getStore();
    const requestId = context?.requestId || meta.requestId;
    const logData = {
      timestamp: new Date().toISOString(),
      level,
      message,
      requestId,
      ...meta,
    };

    if (isProduction) {
      // Production uses structured JSON standard output logs
      console.log(JSON.stringify(logData));
    } else {
      // Development logs pretty printed terminal text
      const color = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : '\x1b[36m';
      const reset = '\x1b[0m';
      console.log(
        `[${logData.timestamp}] ${color}${level.toUpperCase()}${reset}: ${message}`,
        Object.keys(meta).length ? meta : ''
      );
    }
  },
};
