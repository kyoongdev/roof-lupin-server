import { Get, Param } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { ContentCategoryDTO } from '../category/dto';

import { ContentService } from './content.service';

@ApiController('contents', '콘텐츠 - 가로 스크롤')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get(':contentId/detail')
  @RequestApi({
    summary: {
      summary: '콘텐츠 단일 조회',
      description: '콘텐츠 단일 조회',
    },
  })
  @ResponseApi({
    type: ContentCategoryDTO,
  })
  async getContent(@Param('contentId') id: string) {
    return await this.contentService.findContentCategory(id);
  }
}
