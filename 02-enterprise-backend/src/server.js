import http from 'http';
import app from './app.js';
import { config } from './config/index.js';
import { bootstrap } from './bootstrap/index.js';
import { setAppReady } from './health/health.controller.js';
import { logger } from './observability/logger.js';

const server = http.createServer(app);
const PORT = config.server.port;

server.listen(PORT, () => {
  logger.info(`Enterprise server started in ${config.server.env} mode on port ${PORT}`);

  // Set the application state as READY for load balancers
  setAppReady();

  // Load process signal listeners for graceful connection shutdown and exception monitoring
  bootstrap(server);
});
