const winston = require('winston');

module.exports = (logFile, debugMode, filesize = 10485760) =>
  winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSSS',
      }),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.File({
        filename: logFile,
        level: 'info',
        maxsize: filesize,
        zippedArchive: true,
      }),
      debugMode ? new winston.transports.Console({ level: 'debug' }) : false,
    ].filter(x => x),
  });
