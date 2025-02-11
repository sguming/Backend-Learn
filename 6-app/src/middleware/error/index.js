const unauthorizedErrorHandler = require('./authorizedError.middleware');
const conflictErrorHandler = require('./conflictError.middleware');
const finalErrorHandler = require('./finalError.middleware');
const forbiddenErrorHandler = require('./forbiddenError.middleware');
const notFoundErrorHandler = require('./notFoundError.middleware');
const validationErrorHandler = require('./validationError.middleware');

const errorMiddleware = [
  validationErrorHandler, //
  unauthorizedErrorHandler,
  conflictErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  finalErrorHandler, //
];

module.exports = errorMiddleware;
