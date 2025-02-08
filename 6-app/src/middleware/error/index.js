const finalErrorHandler = require('./finalError.middleware');
const validationErrorHandler = require('./validationError.middleware');

const errorMiddleware = [
  validationErrorHandler, //
  finalErrorHandler, //
];

module.exports = errorMiddleware;
