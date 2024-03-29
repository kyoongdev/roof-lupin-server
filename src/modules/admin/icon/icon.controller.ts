import { Body, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { ApiController } from '@/utils';

import { IconDetailDTO, IconDTO } from '../dto/icon';
import { CreateIconDTO } from '../dto/icon/create-icon.dto';

import { AdminIconService } from './icon.service';

@ApiController('icons', '[관리자] 아이콘')
export class AdminIconController {
  constructor(private readonly iconService: AdminIconService) {}

  @Get(':iconId/detail')
  @RequestApi({
    summary: {
      description: '아이콘 상세 불러오기',
      summary: '아이콘 상세 불러오기',
    },
  })
  @ResponseApi({
    type: IconDetailDTO,
  })
  async getIcon(@Param('iconId') id: string) {
    return await this.iconService.findIcon(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '아이콘 리스트 불러오기',
      summary: '아이콘 리스트 불러오기',
    },
  })
  @ResponseApi({
    type: IconDTO,
    isArray: true,
  })
  async getIcons() {
    return await this.iconService.findIcons();
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('icon', {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(svg)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
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
  @ResponseApi(
    {
      type: IconDTO,
    },
    201
  )
  async createIcon(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: CreateIconDTO
  ) {
    return await this.iconService.createIcon(file, body.name);
  }

  @Delete(':iconId')
  @RequestApi({
    summary: {
      description: '아이콘 삭제',
      summary: '아이콘 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteIcon(@Param('iconId') id: string) {
    await this.iconService.deleteIcon(id);
  }
}
