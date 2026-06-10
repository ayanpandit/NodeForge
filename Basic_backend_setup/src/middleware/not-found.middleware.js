import { NotFoundError } from '../errors/index.js';

export function notFoundMiddleware(req, res, next) {
  next(new NotFoundError(`Path not found: ${req.originalUrl}`));
}
