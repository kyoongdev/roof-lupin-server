/* eslint-disable no-undef */
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';

import { UploadedFileDTO } from './dto';

@ApiController('file', '파일')
@Auth([JwtAuthGuard])
export class FileController {
  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 1024 * 1024 * 10 } }))
  @RequestApi({
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
    return 'test';
  }
}
