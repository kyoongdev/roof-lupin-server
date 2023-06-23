import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from '@aws-sdk/client-s3';

import { ImageDTO } from './dto';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = `${Date.now() + file.originalname}`;
      console.log(AWS);
      await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).putObject({
        Key: `${this.configService.get('NODE_ENV')}/${key}`,
        Body: file.buffer,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      });

      const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;
      console.log(url.split(this.configService.get('AWS_CLOUD_FRONT_URL')));
      return new ImageDTO({ url });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile() {
    await new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
      },
    }).deleteObject({
      Key: 'key',
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
    });
  }
}
