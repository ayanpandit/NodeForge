import crypto from 'crypto';

export function requestIdMiddleware(req, res, next) {
  const headerName = 'x-request-id';
  const requestId = req.headers[headerName] || crypto.randomUUID();

  req.id = requestId;
  res.setHeader(headerName, requestId);
  next();
}
