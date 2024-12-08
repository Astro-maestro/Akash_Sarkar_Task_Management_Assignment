const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Set up the log directory
const logDir = path.join(__dirname, '../../logs');  // Adjusted path to ensure correct resolution

// Check if the log directory exists, and if not, create it
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });  // Make sure the directory is created along with any parent directories if necessary
}

// Create the logger instance
const logger = winston.createLogger({
  level: 'info', // Set default log level
  format: winston.format.combine(
    winston.format.colorize(), // Colors for console output
    winston.format.timestamp(), // Add timestamps to log entries
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`; // Format the log entry
    })
  ),
  transports: [
    new winston.transports.Console(),  // Log to the console
    new winston.transports.File({ filename: path.join(logDir, 'app.log') })  // Log to a file in the 'logs' directory
  ]
});

// Export the logger for use in other files
module.exports = logger;
