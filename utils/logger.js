const path = require('path')
const winston = require('winston');
const { format, transports } = winston

const logDir = path.join(path.dirname(path.__dirname), 'logs')

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: '[log]' }),
    format.timestamp({
      format: 'YYYY-MM-D HH:mm:ss'
    }),
    format.simple()
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'info',
      maxsize: 500
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger

// logger.info
// logger.warn
// logger.log
// log.error