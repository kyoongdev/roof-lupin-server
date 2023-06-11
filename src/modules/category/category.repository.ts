import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CategoryDTO } from './dto';
import { CategoryException } from './exception/category.exception';
import { CATEGORY_ERROR_CODE, CATEGORY_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class CategoryRepository {
  constructor(private readonly database: PrismaService) {}

  async findCategory(id: string) {
    const category = await this.database.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new CategoryException(CATEGORY_ERROR_CODE.NOT_FOUND(CATEGORY_NOT_FOUND));
    }
    return new CategoryDTO(category);
  }

  async findCategories(args = {} as Prisma.CategoryFindManyArgs) {
    const categories = await this.database.category.findMany(args);

    return categories.map((category) => new CategoryDTO(category));
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    //
  }
}
