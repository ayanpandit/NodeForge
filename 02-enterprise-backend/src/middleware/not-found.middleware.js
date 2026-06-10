import { NotFoundError } from '../errors/index.js';

export function notFoundMiddleware(req, res, next) {
  next(new NotFoundError(`Requested path not found: ${req.originalUrl}`));
}
