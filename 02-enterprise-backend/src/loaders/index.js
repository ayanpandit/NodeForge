import { expressLoader } from './express.js';
import { logger } from '../observability/logger.js';

export async function initLoaders(app) {
  logger.info('Starting system subloader execution sequence...');

  expressLoader(app);

  logger.info('All loader systems compiled successfully.');
}
