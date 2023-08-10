import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from '@/modules/category/dto';
import { FindCategoriesQuery } from '@/modules/category/dto/query';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
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
}
