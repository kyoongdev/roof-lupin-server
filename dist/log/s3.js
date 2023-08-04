"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3StreamLogger = void 0;
const config_1 = require("@nestjs/config");
const s3_streamlogger_1 = require("s3-streamlogger");
const config = new config_1.ConfigService();
const getS3StreamLogger = (level) => {
    const timeData = new Date();
    timeData.setHours(timeData.getHours() + 9);
    return new s3_streamlogger_1.S3StreamLogger({
        tags: {
            type: 'log',
        },
        folder: `${config.get('NODE_ENV')}/${level}`,
        name_format: `${timeData.toDateString()}.log`,
        bucket: config.get('AWS_S3_LOG_BUCKET_NAME'),
        access_key_id: config.get('AWS_S3_ACCESS_KEY'),
        secret_access_key: config.get('AWS_S3_PRIVATE_KEY'),
    });
};
exports.getS3StreamLogger = getS3StreamLogger;
//# sourceMappingURL=s3.js.map