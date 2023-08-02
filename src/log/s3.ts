import { ConfigService } from '@nestjs/config';

import { S3StreamLogger } from 's3-streamlogger';

const config = new ConfigService();

export const getS3StreamLogger = (level: string) => {
  const timeData = new Date();
  timeData.setHours(timeData.getHours() + 9);

  return new S3StreamLogger({
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
