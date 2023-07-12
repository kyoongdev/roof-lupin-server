import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { ContentCategoryDTO } from './dto/content-category.dto';
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

  async countContentCategories(args = {} as Prisma.ContentCategoryCountArgs) {
    return await this.database.contentCategory.count(args);
  }

  async findContentCategories(args = {} as Prisma.ContentCategoryFindManyArgs, userId?: string) {
    const contentCategories = await this.database.contentCategory.findMany({
      ...args,
      where: args.where,
      include: {
        spaces: {
          include: {
            space: {
              include: {
                location: true,
                reviews: true,
                publicTransportations: true,
                userInterests: true,
                rentalType: true,
              },
            },
          },
        },
      },
    });

    return contentCategories.map(
      (contentCategory) =>
        new ContentCategoryDTO({
          ...contentCategory,
          spaces: contentCategory.spaces.map(({ space, orderNo }) => {
            return {
              orderNo,
              space: {
                ...space,
                reviewCount: space.reviews.length,
                location: space.location,
                averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
                isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
              },
            };
          }),
        })
    );
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
