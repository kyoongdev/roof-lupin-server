import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from './dto';
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

  async countCategories(args = {} as Prisma.CategoryCountArgs) {
    return await this.database.category.count(args);
  }

  async findCategories(args = {} as Prisma.CategoryFindManyArgs) {
    const categories = await this.database.category.findMany(args);

    return categories.map((category) => new CategoryDTO(category));
  }

  async createCategory(data: CreateCategoryDTO) {
    const category = await this.database.category.create({
      data,
    });

    return category.id;
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    await this.database.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteCategory(id: string) {
    await this.database.category.delete({
      where: {
        id,
      },
    });
  }
}
