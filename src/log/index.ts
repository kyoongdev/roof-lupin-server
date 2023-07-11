import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const logger = new winston.transports.Console({
  level: process.env.NODE_ENV === 'prod' ? 'http' : 'debug',
  format:
    process.env.NODE_ENV === 'prod'
      ? winston.format.simple()
      : winston.format.combine(
          winston.format.colorize({
            all: true,
            colors: {
              error: 'red',
              warn: 'yellow',
              info: 'green',
              http: 'magenta',
              debug: 'blue',
            },
          }),
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          utilities.format.nestLike('루프루팡', { prettyPrint: true, colors: true })
        ),
});

const winstonLogger = WinstonModule.createLogger({
  transports: [logger],
});
export { winstonLogger, logger as loggerOption };
