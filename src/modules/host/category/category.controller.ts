import { Get } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { CategoryDTO } from '@/modules/category/dto';
import { ApiController } from '@/utils';

import { HostCategoryService } from './category.service';

@ApiController('categories', '[호스트] 카테고리')
export class HostCategoryController {
  constructor(private readonly categoryService: HostCategoryService) {}

  @Get('home')
  @RequestApi({
    summary: {
      description: '홈 화면 카테고리 목록 조회',
      summary: '홈 화면 카테고리 목록 조회',
    },
  })
  @ResponseApi({
    type: CategoryDTO,
    isArray: true,
  })
  async getHomeCategories() {
    return await this.categoryService.findHomeCategories();
  }
}
