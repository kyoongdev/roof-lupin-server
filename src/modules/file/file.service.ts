import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from '@aws-sdk/client-s3';
import convert from 'heic-convert';
import sharp from 'sharp';

import { ImageDTO, UploadedFileDTO } from './dto';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  toBuffer(arrayBuffer: ArrayBuffer) {
    const buffer = Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
  }

  async imageResize(file: Buffer) {
    const transformer = await sharp(file)
      .resize({ width: 720, height: 485, fit: sharp.fit.cover })
      .jpeg({ mozjpeg: true })
      .toBuffer();
    return transformer;
  }

  async heicConvert(file: Express.Multer.File) {
    const transformer = await convert({
      buffer: file.buffer,
      format: 'JPEG',
      quality: 1,
    });
    return this.toBuffer(transformer);
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const originalname = file.originalname.split('.').shift();

      const key = `${Date.now() + `${originalname}.jpeg`}`;

      const resizedFile = await this.imageResize(
        file.originalname.includes('heic') ? await this.heicConvert(file) : file.buffer
      );

      await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).putObject({
        Key: `${this.configService.get('NODE_ENV')}/${key}`,
        Body: resizedFile,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      });

      const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;

      return new UploadedFileDTO(url);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  async deleteFile(url: string) {
    try {
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
    } catch (err) {
      throw new InternalServerErrorException('이미지 삭제 중 오류가 발생했습니다.');
    }
  }
}
