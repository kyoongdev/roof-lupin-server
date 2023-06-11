import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly database: PrismaService) {}

  async findCategory(id: string) {
    const category = await this.database.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findCategories(args = {} as Prisma.CategoryFindManyArgs) {
    //
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    //
  }
}
