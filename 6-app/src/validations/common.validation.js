const Joi = require('joi');

const paginationValidationSchema = {
  limit: Joi.number().integer().min(10).max(100).optional().default(10),
  page: Joi.number().integer().min(1).optional().default(1),
};

module.exports = {
  paginationValidationSchema,
};
