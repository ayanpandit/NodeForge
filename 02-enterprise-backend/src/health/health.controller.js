let isReady = false;

export function setAppReady() {
  isReady = true;
}

export function getLiveness(req, res) {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
}

export function getReadiness(req, res) {
  if (isReady) {
    res.status(200).json({ status: 'READY', timestamp: new Date().toISOString() });
  } else {
    res.status(503).json({ status: 'NOT_READY', timestamp: new Date().toISOString() });
  }
}

export function getHealth(req, res) {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
}
