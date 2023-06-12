import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CategoryService } from './category.service';
import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from './dto';

@ApiController('categories', '카테고리')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':categoryId/detail')
  @RequestApi({
    summary: {
      description: '카테고리 단일 조회',
      summary: '카테고리 단일 조회',
    },
    params: {
      name: 'categoryId',
      required: true,
      type: 'string',
      description: '카테고리 ID',
    },
  })
  @ResponseApi({
    type: CategoryDTO,
  })
  async getCategory(@Param('categoryId') id: string) {
    return await this.categoryService.findCategory(id);
  }

  @Get('paging')
  @RequestApi({
    summary: {
      description: '카테고리 리스트 페이징 조회',
      summary: '카테고리 리스트 페이징 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: CategoryDTO,
    isPaging: true,
  })
  async getPagingCategories(@Paging() paging: PagingDTO) {
    return await this.categoryService.findPagingCategories(paging);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '카테고리 리스트  조회',
      summary: '카테고리 리스트  조회',
    },
  })
  @ResponseApi({
    type: CategoryDTO,
    isArray: true,
  })
  async getCategories() {
    return await this.categoryService.findCategories();
  }

  @Get('home')
  @RequestApi({
    summary: {
      description: '홈 카테고리 리스트 조회',
      summary: '홈 카테고리 리스트 조회',
    },
  })
  @ResponseApi({
    type: CategoryDTO,
    isArray: true,
  })
  async getHomeCategories() {
    return await this.categoryService.findCategories({
      where: {
        isHome: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '카테고리 생성',
      summary: '카테고리 생성 - 관리자만 사용가능합니다.',
    },
    body: {
      type: CreateCategoryDTO,
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
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '카테고리 수정',
      summary: '카테고리 수정 - 관리자만 사용가능합니다.',
    },
    params: {
      name: 'categoryId',
      required: true,
      type: 'string',
      description: '카테고리 ID',
    },
    body: {
      type: UpdateCategoryDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateCategory(@Param('categoryId') id: string, @Body() body: UpdateCategoryDTO) {
    return await this.categoryService.updateCategory(id, body);
  }

  @Delete(':categoryId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '카테고리 삭제',
      summary: '카테고리 삭제 - 관리자만 사용가능합니다.',
    },
    params: {
      name: 'categoryId',
      required: true,
      type: 'string',
      description: '카테고리 ID',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteCategory(@Param('categoryId') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
