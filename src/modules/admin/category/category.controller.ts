import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { CategoryDTO } from '@/modules/category/dto';
import { ApiController } from '@/utils';
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
  async getCategories(@Paging() paging: PagingDTO) {
    return await this.categoryService.findPagingCategories(paging);
  }
}
