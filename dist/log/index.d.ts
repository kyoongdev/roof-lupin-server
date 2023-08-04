import * as winston from 'winston';
declare const loggerOption: winston.transports.ConsoleTransportInstance;
declare const logger: import("@nestjs/common").LoggerService;
export { logger, loggerOption };
