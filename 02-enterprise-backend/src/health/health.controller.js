import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, '../../package.json');

let appVersion = '1.0.0';
try {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  appVersion = pkg.version || '1.0.0';
} catch {
  // Use default fallback version
}

let isReady = false;

export function setAppReady() {
  isReady = true;
}

export function getLiveness(req, res) {
  res.status(200).json({ status: 'UP', version: appVersion, timestamp: new Date().toISOString() });
}

export function getReadiness(req, res) {
  if (isReady) {
    res
      .status(200)
      .json({ status: 'READY', version: appVersion, timestamp: new Date().toISOString() });
  } else {
    res
      .status(503)
      .json({ status: 'NOT_READY', version: appVersion, timestamp: new Date().toISOString() });
  }
}

export function getHealth(req, res) {
  res.status(200).json({
    status: 'UP',
    version: appVersion,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
}

export function getVersion(req, res) {
  res.status(200).json({ version: appVersion });
}
