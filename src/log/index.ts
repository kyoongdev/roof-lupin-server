import { ConfigService } from '@nestjs/config';

import appRootPath from 'app-root-path';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

import { getS3StreamLogger } from './s3';

const config = new ConfigService();
const appRoot = `${appRootPath.path}/logs` as const;
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

const timezoned = () => {
  return new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });
};

const loggerOption = new winston.transports.Console({
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
            format: timezoned,
          }),
          utilities.format.nestLike('루프루팡', { prettyPrint: true, colors: true })
        ),
});

const logger = WinstonModule.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM_DD HH:mm:ss' }), logFormat),
  transports: [
    loggerOption,
    ...(config.get('APP_ENV') === 'local'
      ? [
          new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: `${appRoot}/info`,
            maxFiles: 30,
            zippedArchive: true,
            stream: getS3StreamLogger('info'),
          }),
          new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: `${appRoot}/error`,
            maxFiles: 30,
            zippedArchive: true,
            stream: getS3StreamLogger('info'),
          }),
        ]
      : []),
  ],
  exceptionHandlers: [
    ...(config.get('APP_ENV') === 'local'
      ? [
          new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: `${appRoot}/exception`,
            maxFiles: 30,
            zippedArchive: true,
            stream: getS3StreamLogger('info'),
          }),
        ]
      : []),
  ],
});

export { logger, loggerOption };
