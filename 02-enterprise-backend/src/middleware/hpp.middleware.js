/**
 * Prevents HTTP Parameter Pollution attacks by ensuring parameters are strings, not arrays.
 * If an array of values is supplied, the last index is chosen.
 */
export function hppMiddleware(req, res, next) {
  if (req.query) {
    for (const key in req.query) {
      if (Array.isArray(req.query[key])) {
        req.query[key] = req.query[key][req.query[key].length - 1];
      }
    }
  }

  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (Array.isArray(req.body[key])) {
        req.body[key] = req.body[key][req.body[key].length - 1];
      }
    }
  }

  next();
}
