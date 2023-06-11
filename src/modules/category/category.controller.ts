import { Get, Param } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { CategoryService } from './category.service';
import { CategoryDTO } from './dto';

@ApiController('categories', '카테고리')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':categoryId')
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
}
