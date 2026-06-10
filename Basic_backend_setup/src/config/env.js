import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from local .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnv = ['PORT', 'NODE_ENV'];

export function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Configuration Validation Error: Missing required environment variables: ${missing.join(', ')}`
    );
  }

  const validEnvs = ['development', 'production', 'test'];
  if (!validEnvs.includes(process.env.NODE_ENV)) {
    throw new Error(
      `Configuration Validation Error: NODE_ENV must be one of: ${validEnvs.join(', ')}`
    );
  }

  const port = parseInt(process.env.PORT, 10);
  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(
      'Configuration Validation Error: PORT must be a valid number between 1 and 65535'
    );
  }
}
