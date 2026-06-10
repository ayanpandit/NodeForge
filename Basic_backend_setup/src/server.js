import http from 'http';
import app from './app.js';
import { config } from './config/index.js';

const server = http.createServer(app);
const PORT = config.server.port;

server.listen(PORT, () => {
  console.info(`Server started in ${config.server.env} mode on port ${PORT}`);
});

const gracefulShutdown = (signal) => {
  console.info(`Received ${signal}. Starting graceful shutdown...`);

  // Terminate acceptance of incoming requests, and gracefully drain current connections
  server.close(() => {
    console.info('HTTP server closed.');
    // Close secondary resources like database client connections or message queues here
    process.exit(0);
  });

  // Force termination fallback if connections fail to drain within 10s
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
  // Gracefully close connections and exit
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION] at:', promise, 'reason:', reason);
});
