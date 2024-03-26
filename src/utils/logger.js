const { createLogger, format, transports } = require('winston');

const { combine, printf, timestamp } = format;

const logger = createLogger({
  exitOnError: false,
  levels: {
    debug: 5,
    info: 4,
    silly: 3,
    warn: 2,
    error: 1,
    critical: 0,
  },
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(info => {
      const splat = info[Symbol.for('splat')];
      if (splat) {
        return `[${info.level}] ${info.message}: ${info.timestamp} - meta ${JSON.stringify(splat[0])}`;
      }
      return `[${info.level}] ${info.message}: ${info.timestamp}`;
    }),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      stderrLevels: ['error', 'warning'],
    }),
  ],
});

module.exports = logger;
