import { Body, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { UploadedFileDTO } from '@/modules/file/dto';
import { ApiController } from '@/utils';

import { CreateIconDTO } from '../dto/icon/create-icon.dto';

@ApiController('icons', '[관리자] 아이콘')
export class AdminIconController {
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { limits: { fileSize: 1024 * 1024 * 10 } }))
  @RequestApi({
    summary: {
      description: '아이콘 업로드',
      summary: '아이콘 업로드',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          icon: {
            type: 'string',
            format: 'binary',
          },
          name: {
            type: 'string',
          },
        },
      },
    },
  })
  @ResponseApi({
    type: UploadedFileDTO,
  })
  async updateIcon(@UploadedFile() file: Express.Multer.File, @Body() body: CreateIconDTO) {
    console.log(body, file);
  }
}
