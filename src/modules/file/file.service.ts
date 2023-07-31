import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from '@aws-sdk/client-s3';
import convert from 'heic-convert';
import sharp from 'sharp';

import { PrismaService } from '@/database/prisma.service';

import { ImageDTO, S3ImageDTO, UploadedFileDTO } from './dto';

@Injectable()
export class FileService {
  constructor(private readonly database: PrismaService, private readonly configService: ConfigService) {}

  toBuffer(arrayBuffer: ArrayBuffer) {
    const buffer = Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
  }

  async deleteAll() {
    const files = await this.getAllFiles();
    await Promise.all(files.map((file) => this.deleteFile(file.key)));
  }

  async getAllFiles() {
    const files = await new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
      },
    }).listObjects({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Prefix: 'dev',
    });

    return files.Contents
      ? await Promise.all(
          files.Contents.filter((file) => file.Size > 0).map(async (file) => {
            const url = ImageDTO.parseS3ImageURL(file.Key);
            const inUse = await this.checkInUse(url);

            return new S3ImageDTO({
              key: file.Key,
              url: `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${file.Key}`,
              inUse,
            });
          })
        )
      : [];
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
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  async uploadIcon(file: Express.Multer.File) {
    try {
      const originalname = file.originalname.split('.').shift();

      const key = `${Date.now() + `${originalname}.svg`}`;

      await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).putObject({
        Key: `${this.configService.get('NODE_ENV')}/${key}`,
        Body: file,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      });

      const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;

      return new UploadedFileDTO(url);
    } catch (error) {
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

  private async imageResize(file: Buffer) {
    const transformer = await sharp(file)
      .resize({ width: 780, height: 564, fit: sharp.fit.cover })
      .jpeg({ mozjpeg: true })
      .toBuffer();
    return transformer;
  }

  private async heicConvert(file: Express.Multer.File) {
    const transformer = await convert({
      buffer: file.buffer,
      format: 'JPEG',
      quality: 1,
    });
    return this.toBuffer(transformer);
  }

  async checkInUse(url: string) {
    const image = await this.database.image.findFirst({
      where: {
        url,
      },
    });
    const icon = await this.database.icon.findFirst({
      where: {
        url,
      },
    });
    const building = await this.database.building.findFirst({
      where: {
        iconPath: url,
      },
    });

    const service = await this.database.service.findFirst({
      where: {
        iconPath: url,
      },
    });

    const category = await this.database.category.findFirst({
      where: {
        iconPath: url,
      },
    });

    const exhibition = await this.database.exhibition.findFirst({
      where: {
        thumbnail: url,
      },
    });
    const curation = await this.database.curation.findFirst({
      where: {
        thumbnail: url,
      },
    });
    const mainImage = await this.database.mainImage.findFirst({
      where: {
        url,
      },
    });
    const space = await this.database.space.findFirst({
      where: { thumbnail: url },
    });

    const host = await this.database.host.findFirst({
      where: {
        profileImage: url,
      },
    });

    const user = await this.database.user.findFirst({
      where: {
        profileImage: url,
      },
    });

    return (
      Boolean(user) ||
      Boolean(host) ||
      Boolean(space) ||
      Boolean(mainImage) ||
      Boolean(exhibition) ||
      Boolean(curation) ||
      Boolean(category) ||
      Boolean(service) ||
      Boolean(building) ||
      Boolean(icon) ||
      Boolean(image)
    );
  }
}
