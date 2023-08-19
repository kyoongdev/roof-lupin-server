import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from '@aws-sdk/client-s3';
import convert from 'heic-convert';
import mime from 'mime-types';
import sharp from 'sharp';

import { PrismaService } from '@/database/prisma.service';
import { logger } from '@/log';

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

  async getAllFiles(isImage = true) {
    const files = await new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
      },
    }).listObjects({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Prefix: this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev',
    });

    return files.Contents
      ? await Promise.all(
          files.Contents.filter(
            (file) => file.Size > 0 && file.Key && (isImage ? file.Key.includes('jpeg') : file.Key.includes('svg'))
          ).map(async (file) => {
            const url = ImageDTO.parseS3ImageURL(file.Key);
            const inUse = await this.checkInUse(url);

            return new S3ImageDTO({
              key: file.Key,
              url,
              inUse,
            });
          })
        )
      : [];
  }

  async getFile(key: string) {
    try {
      const file = await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).getObject({
        Bucket: `${this.configService.get('AWS_S3_BUCKET_NAME')}`,
        Key: `${this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}/${key}`,
      });

      return file.Body ? file.Body : null;
    } catch (err) {
      return null;
    }
  }

  async uploadResizedFile(
    file: Express.Multer.File,
    originKey?: string,
    width?: number,
    height?: number,
    contentType = 'image/jpeg'
  ) {
    try {
      const { key, fileBuffer } = await this.getFileSpec(file);

      const resizedFile = await this.imageResize(fileBuffer, width, height);

      await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).putObject({
        Key: `${this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}/${key}`,
        Body: resizedFile,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        ContentType: contentType,
      });

      const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;

      return new UploadedFileDTO(url);
    } catch (error) {
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  async uploadFile(file: Express.Multer.File, originKey?: string, contentType = 'image/jpeg') {
    try {
      const { key, fileBuffer } = await this.getFileSpec(file);
      await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).putObject({
        Key: `${this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}/${key}`,
        Body: fileBuffer,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        ContentType: contentType,
      });

      const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;

      return new UploadedFileDTO(url);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  async uploadBuffer(buffer: Buffer, originKey: string, contentType = 'image/jpeg') {
    try {
      const key = originKey;

      await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).putObject({
        Key: `${this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}/${key}`,
        Body: buffer,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        ContentType: contentType,
      });

      const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;

      return new UploadedFileDTO(url);
    } catch (error) {
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  async uploadIcon(file: Express.Multer.File) {
    try {
      const { key, fileBuffer } = await this.getFileSpec(file);

      await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).putObject({
        Key: `${this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}/${key}`,
        Body: fileBuffer,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        ContentType: 'image/svg+xml',
      });

      const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;

      return new UploadedFileDTO(url);
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  async deleteFile(url: string) {
    try {
      const result = await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).deleteObject({
        Key: ImageDTO.parseS3ImageKey(url),
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      });
      console.log(result, ImageDTO.parseS3ImageKey(url));
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('이미지 삭제 중 오류가 발생했습니다.');
    }
  }

  private async getFileSpec(file: Express.Multer.File, originKey?: string) {
    const originalname = file.originalname.split('.').shift();
    const isHeic = file.originalname.includes('.heic');
    const ext = mime.extension(file.mimetype);

    if (!ext) {
      throw new BadRequestException('파일 형식이 올바르지 않습니다.');
    }

    const key = `${Date.now() + `${originKey ?? originalname}.${isHeic ? 'heic' : ext}`}`;

    const fileBuffer = file.originalname.includes('heic') ? await this.heicConvert(file) : file.buffer;

    return { key, fileBuffer };
  }

  private async imageResize(file: Buffer, width?: number, height?: number) {
    const transformer = await sharp(file)
      .resize({ width: width ?? 780, height: height ?? 564, fit: sharp.fit.cover })
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

    const exhibition = await this.database.exhibition.findFirst({
      where: {
        OR: [
          {
            thumbnail: url,
          },
          {
            content: {
              contains: url,
            },
          },
        ],
      },
    });
    const curation = await this.database.curation.findFirst({
      where: {
        OR: [
          { thumbnail: url },
          {
            content: {
              contains: url,
            },
          },
        ],
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
      Boolean(exhibition) ||
      Boolean(curation) ||
      Boolean(icon) ||
      Boolean(image)
    );
  }
}
