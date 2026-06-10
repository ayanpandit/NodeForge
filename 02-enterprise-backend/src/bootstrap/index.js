import { initProcessHandlers } from './process.js';
import { logger } from '../observability/logger.js';

export function bootstrap(server) {
  logger.info('Initializing process-level signal listeners...');
  initProcessHandlers(server);
}
