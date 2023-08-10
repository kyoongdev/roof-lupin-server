import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import {
  CategoryDTO,
  ContentCategoryDTO,
  CreateCategoryDTO,
  CreateContentCategoryDTO,
  CreateContentCategorySpaceDTO,
  UpdateCategoryDTO,
  UpdateContentCategoryDTO,
  UpdateContentCategorySpaceDTO,
} from '@/modules/category/dto';
import { FindCategoriesQuery, FindContentCategoryQuery } from '@/modules/category/dto/query';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { RevalidateApi, RevalidateApiDecorator } from '@/utils/aop/revalidate';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminCategoryService } from './category.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('/categories', '[관리자] 카테고리 관리')
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  @Get(':categoryId/detail')
  @RequestApi({
    summary: {
      description: '카테고리 불러오기',
      summary: '카테고리 자세히 불러오기',
    },
  })
  @ResponseApi({
    type: CategoryDTO,
  })
  async getCategory(@Param('categoryId') id: string) {
    return await this.categoryService.findCategory(id);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '카테고리 목록 불러오기',
      summary: '카테고리 목록 불러오기',
    },
  })
  @ResponseApi({ type: CategoryDTO, isPaging: true })
  async getCategories(@Paging() paging: PagingDTO, @Query() query: FindCategoriesQuery) {
    return await this.categoryService.findPagingCategories(paging, query.generateQuery());
  }

  @Get('/contents')
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
    return await this.categoryService.findPagingContentCategories(paging, query.generateQuery());
  }

  @Get('/contents/all')
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
    return await this.categoryService.findContentCategories();
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '카테고리 생성',
      summary: '카테고리 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createCategory(@Body() body: CreateCategoryDTO) {
    return await this.categoryService.createCategory(body);
  }

  @Post('/contents')
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
    return await this.categoryService.createContentCategory(body);
  }

  @Post('/contents/:contentCategoryId/spaces')
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
    return await this.categoryService.createContentCategorySpace(id, body);
  }

  @Patch(':categoryId')
  @RequestApi({
    summary: {
      description: '카테고리 수정',
      summary: '카테고리 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateCategory(@Param('categoryId') id: string, @Body() body: UpdateCategoryDTO) {
    await this.categoryService.updateCategory(id, body);
  }

  @RevalidateApi([{ key: '/home/contents' }])
  @Patch('/contents/:contentCategoryId')
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
    await this.categoryService.updateContentCategory(id, data);
  }

  @RevalidateApi([{ key: '/home/contents' }])
  @Patch('/contents/:contentCategoryId/spaces')
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
    await this.categoryService.updateContentCategorySpace(id, data);
  }

  @Delete(':categoryId')
  @RequestApi({
    summary: {
      description: '카테고리 삭제',
      summary: '카테고리 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteCategory(@Param('categoryId') id: string) {
    await this.categoryService.deleteCategory(id);
  }

  @RevalidateApi([{ key: '/home/contents' }])
  @Delete('/contents/:contentCategoryId')
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
    await this.categoryService.deleteContentCategory(id);
  }

  @RevalidateApi([{ key: '/home/contents' }])
  @Delete('/contents/:contentCategoryId/spaces/:spaceId')
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
    await this.categoryService.deleteContentCategorySpace(id, spaceId);
  }
}
