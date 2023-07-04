/* eslint-disable no-undef */
import { Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { UploadedFileDTO } from './dto';
import { FileService } from './file.service';

@ApiController('file', '파일')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 1024 * 1024 * 10 } }))
  @RequestApi({
    summary: {
      description: '이미지 업로드',
      summary: '이미지 업로드',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ResponseApi(
    {
      type: UploadedFileDTO,
    },
    201
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }

  @Post('/images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', undefined, { limits: { fileSize: 1024 * 1024 * 10 } }))
  @RequestApi({
    summary: {
      description: '이미지 업로드',
      summary: '이미지 업로드',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    },
  })
  @ResponseApi(
    {
      type: UploadedFileDTO,
      isArray: true,
    },
    201
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const images = await Promise.all(files.map(async (file) => await this.fileService.uploadFile(file)));

    return images;
  }
}
