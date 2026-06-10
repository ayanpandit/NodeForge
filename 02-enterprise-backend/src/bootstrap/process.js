import { logger } from '../observability/logger.js';

export function initProcessHandlers(server) {
  const gracefulShutdown = (signal) => {
    logger.warn(`Received ${signal}. Starting graceful shutdown connection draining...`);

    // Signal state readiness systems or Kubernetes controllers that we're no longer ready
    // server.close stops accepting new network requests and gracefully drains current sockets
    server.close(() => {
      logger.info('HTTP server closed successfully. Drained active sockets.');
      // Terminate databases and messaging connections here
      process.exit(0);
    });

    // Enforce shutdown threshold timeout (10 seconds)
    setTimeout(() => {
      logger.error('Graceful shutdown connection draining timeout exceeded. Forcefully exiting.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception details:', {
      error: error.message,
      stack: error.stack,
    });
    // Operational safety check: crash instantly on programmer error to prevent corrupt state
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection detected:', {
      promise,
      reason: reason instanceof Error ? reason.message : reason,
      stack: reason instanceof Error ? reason.stack : undefined,
    });
  });
}
