import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from 'aws-sdk';

import { ImageDTO } from './dto';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File) {
    AWS.config.update({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
      },
    });
    try {
      const key = `${Date.now() + file.originalname}`;

      await new AWS.S3()
        .putObject({
          Key: key,
          Body: file.buffer,
          Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        })
        .promise();

      const url = `${this.configService.get('AWS_S3_BUCKET_URL')}${key}`;

      return new ImageDTO({ url });
    } catch (error) {
      console.log(error);
    }
  }
}
