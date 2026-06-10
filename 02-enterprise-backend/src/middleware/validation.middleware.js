import { BadRequestError } from '../errors/index.js';

/**
 * Scaffolding request validation middleware runner.
 * Custom schema validations (Zod / Joi) can be passed here to compile and run against incoming payloads.
 */
export function validateRequest(schema) {
  return (req, res, next) => {
    if (schema && typeof schema.parse === 'function') {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
      } catch (error) {
        return next(new BadRequestError(error.message || 'Validation Constraint Error'));
      }
    }
    next();
  };
}
