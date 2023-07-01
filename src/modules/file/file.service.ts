import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from '@aws-sdk/client-s3';

import { ImageDTO, UploadedFileDTO } from './dto';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = `${Date.now() + file.originalname}`;

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

      return new UploadedFileDTO(url);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(url: string) {
    await new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
      },
    }).deleteObject({
      Key: ImageDTO.parseS3ImageKey(url),
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
    });
  }
}
