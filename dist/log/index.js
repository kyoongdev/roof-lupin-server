"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerOption = exports.logger = void 0;
const config_1 = require("@nestjs/config");
const app_root_path_1 = __importDefault(require("app-root-path"));
const nest_winston_1 = require("nest-winston");
const winston = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const s3_1 = require("./s3");
const config = new config_1.ConfigService();
const appRoot = `${app_root_path_1.default.path}/logs`;
const { combine, timestamp, printf } = winston.format;
const logFormat = printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);
const winstonTimeZone = () => {
    return new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
    });
};
const loggerOption = new winston.transports.Console({
    level: process.env.NODE_ENV === 'prod' ? 'http' : 'debug',
    format: process.env.NODE_ENV === 'prod'
        ? winston.format.simple()
        : winston.format.combine(winston.format.colorize({
            all: true,
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'green',
                http: 'magenta',
                debug: 'blue',
            },
        }), winston.format.timestamp({
            format: winstonTimeZone,
        }), nest_winston_1.utilities.format.nestLike('루프루팡', { prettyPrint: true, colors: true })),
});
exports.loggerOption = loggerOption;
const logger = nest_winston_1.WinstonModule.createLogger({
    format: combine(timestamp({ format: winstonTimeZone }), logFormat),
    transports: [
        loggerOption,
        new winston_daily_rotate_file_1.default({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: `${appRoot}/info`,
            maxFiles: 30,
            zippedArchive: true,
            ...(config.get('APP_ENV') !== 'local'
                ? { stream: (0, s3_1.getS3StreamLogger)('info') }
                : {
                    filename: `%DATE%.log`,
                }),
        }),
        new winston_daily_rotate_file_1.default({
            level: 'log',
            datePattern: 'YYYY-MM-DD',
            dirname: `${appRoot}/log`,
            maxFiles: 30,
            zippedArchive: true,
            ...(config.get('APP_ENV') !== 'local'
                ? { stream: (0, s3_1.getS3StreamLogger)('log') }
                : {
                    filename: `%DATE%.log`,
                }),
        }),
        new winston_daily_rotate_file_1.default({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: `${appRoot}/error`,
            maxFiles: 30,
            zippedArchive: true,
            ...(config.get('APP_ENV') !== 'local'
                ? { stream: (0, s3_1.getS3StreamLogger)('error') }
                : {
                    filename: `%DATE%.log`,
                }),
        }),
    ],
    exceptionHandlers: [
        ...(config.get('APP_ENV') === 'local'
            ? [
                new winston_daily_rotate_file_1.default({
                    level: 'error',
                    datePattern: 'YYYY-MM-DD',
                    dirname: `${appRoot}/exception`,
                    maxFiles: 30,
                    zippedArchive: true,
                    stream: (0, s3_1.getS3StreamLogger)('info'),
                }),
            ]
            : []),
    ],
});
exports.logger = logger;
//# sourceMappingURL=index.js.map