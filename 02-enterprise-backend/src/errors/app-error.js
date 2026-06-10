export class AppError extends Error {
  /**
   * @param {string} message - Error details
   * @param {number} statusCode - HTTP status code
   * @param {boolean} isOperational - Used to identify predictable operational errors from software bugs
   */
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
