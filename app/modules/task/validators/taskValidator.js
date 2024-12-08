const Joi = require('joi');

const taskValidationSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'Title must be a string.',
      'string.empty': 'Title cannot be empty.',
      'string.max': 'Title cannot exceed 100 characters.',
      'any.required': 'Title is required.',
    }),

  description: Joi.string()
    .optional()
    .allow("")
    .messages({
      'string.base': 'Description must be a string.',
    }),

  status: Joi.string()
    .valid('TODO', 'IN_PROGRESS', 'COMPLETED')
    .messages({
      'any.only': 'Status must be one of TODO, IN_PROGRESS, or COMPLETED.',
    }),

  priority: Joi.string()
    .valid('LOW', 'MEDIUM', 'HIGH')
    .required()
    .messages({
      'any.only': 'Priority must be one of LOW, MEDIUM, or HIGH.',
      'any.required': 'Priority is required.',
    }),

  dueDate: Joi.date()
    .optional()
    .messages({
      'date.base': 'Due Date must be a valid date.',
    }),

  isDeleted: Joi.boolean()
    .default(false)
    .messages({
      'boolean.base': 'isDeleted must be a boolean.',
    }),

    deletedAt: Joi.any()
    .optional(),

  createdAt: Joi.date()
    .forbidden()
    .messages({
      'any.unknown': 'The createdAt field is managed by the system and cannot be set manually.',
    }),

  updatedAt: Joi.date()
    .forbidden()
    .messages({
      'any.unknown': 'The updatedAt field is managed by the system and cannot be set manually.',
    }),
});

module.exports = taskValidationSchema;
