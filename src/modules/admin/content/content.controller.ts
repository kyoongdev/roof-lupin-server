import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import {
  ContentCategoryDTO,
  CreateContentCategoryDTO,
  CreateContentCategorySpaceDTO,
  UpdateContentCategoryDTO,
  UpdateContentCategorySpaceDTO,
} from '@/modules/category/dto';
import { FindContentCategoryQuery } from '@/modules/category/dto/query';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { RevalidateApi } from '@/utils/aop/revalidate';

import { AdminContentService } from './content.service';

@ApiController('contents', '[관리자] 컨텐츠 - 가로 스크롤')
export class AdminContentController {
  constructor(private readonly contentService: AdminContentService) {}

  @Get(':contentCategoryId/detail')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 단건 불러오기',
      summary: '콘텐츠 카테고리 (가로 스크롤) 단건 불러오기',
    },
  })
  @ResponseApi({
    type: ContentCategoryDTO,
  })
  async getContentCategory(@Param('contentCategoryId') id: string) {
    return await this.contentService.findContentCategory(id);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 목록 불러오기',
      summary: '콘텐츠 카테고리 (가로 스크롤) 목록 불러오기',
    },
  })
  @ResponseApi({
    type: ContentCategoryDTO,
    isPaging: true,
  })
  async getPagingContentCategory(@Paging() paging: PagingDTO, @Query() query: FindContentCategoryQuery) {
    return await this.contentService.findPagingContentCategories(paging, query.generateQuery());
  }

  @Get('all')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 전체 불러오기',
      summary: '콘텐츠 카테고리 (가로 스크롤) 전체 불러오기',
    },
  })
  @ResponseApi({
    type: ContentCategoryDTO,
    isArray: true,
  })
  async getContentCategories() {
    return await this.contentService.findContentCategories();
  }
  @Post('')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 생성',
      summary: '콘텐츠 카테고리 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createContentCategory(@Body() body: CreateContentCategoryDTO) {
    return await this.contentService.createContentCategory(body);
  }

  @Post(':contentCategoryId/spaces')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 공간 추가하기',
      summary: '콘텐츠 카테고리 공간 추가하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    201
  )
  async createContentCategorySpace(
    @Param('contentCategoryId') id: string,
    @Body() body: CreateContentCategorySpaceDTO
  ) {
    return await this.contentService.createContentCategorySpace(id, body);
  }

  @RevalidateApi([{ key: '/home' }])
  @Patch(':contentCategoryId')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 수정',
      summary: '콘텐츠 카테고리 수정',
    },
    params: {
      name: 'contentCategoryId',
      type: 'string',
    },
    body: {
      type: UpdateContentCategoryDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateContentCategory(@Body() data: UpdateContentCategoryDTO, @Param('contentCategoryId') id: string) {
    await this.contentService.updateContentCategory(id, data);
  }

  @RevalidateApi([{ key: '/home' }])
  @Patch(':contentCategoryId/spaces')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 공간 수정',
      summary: '콘텐츠 카테고리 공간 수정',
    },
    params: {
      name: 'contentCategoryId',
      type: 'string',
    },
    body: {
      type: UpdateContentCategorySpaceDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateContentCategorySpace(
    @Param('contentCategoryId') id: string,
    @Body() data: UpdateContentCategorySpaceDTO
  ) {
    await this.contentService.updateContentCategorySpace(id, data);
  }

  @RevalidateApi([{ key: '/home' }])
  @Delete(':contentCategoryId')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 수정',
      summary: '콘텐츠 카테고리 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteContentCategory(@Param('contentCategoryId') id: string) {
    await this.contentService.deleteContentCategory(id);
  }

  @RevalidateApi([{ key: '/home' }])
  @Delete(':contentCategoryId/spaces/:spaceId')
  @RequestApi({
    summary: {
      description: '콘텐츠 카테고리 수정',
      summary: '콘텐츠 카테고리 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteContentCategorySpace(@Param('contentCategoryId') id: string, @Param('spaceId') spaceId: string) {
    await this.contentService.deleteContentCategorySpace(id, spaceId);
  }
}
