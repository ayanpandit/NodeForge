import crypto from 'crypto';
import { correlationContext } from '../observability/correlation.js';

export function requestIdMiddleware(req, res, next) {
  const headerName = 'x-request-id';
  const requestId = req.headers[headerName] || crypto.randomUUID();

  req.id = requestId;
  res.setHeader(headerName, requestId);

  correlationContext.run({ requestId }, () => {
    next();
  });
}
