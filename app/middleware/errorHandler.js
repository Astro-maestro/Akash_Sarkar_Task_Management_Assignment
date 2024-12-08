const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    // Log the error details - For production, replace console.log with Winston
    console.error(err); // You can later replace this with a logging library like Winston for better management
    logger.error(err); // Log the error using Winston
    // Default to 500 if statusCode is not set on the error object
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Send the response
    res.status(statusCode).json({
      message,
      // Send the stack trace only in development for security reasons
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = errorHandler;
  