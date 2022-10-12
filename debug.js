const {mouse, useLogger, consoleLogger, Point} = require("./dist");
const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.errors({stack:true}),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error', format: winston.format.json() }),
    new winston.transports.File({ filename: 'combined.log', format: winston.format.json()}),
  ],
});

const useWinston = (winstonLogger) => {
  return {
    trace: (message, data) => {
      const stackTrace = new Error().stack;
      winstonLogger.silly(message, {data, stackTrace})
    },
    debug: (message, data) => winstonLogger.debug(message, data),
    info: (message, data) => winstonLogger.info(message, data),
    warn: (message, data) => winstonLogger.warn(message, data),
    error: (error, data) => winstonLogger.error(error, data),
  }
}

useLogger(useWinston(logger));

(async () => {
    await mouse.setPosition(new Point(10, 10));
})();
