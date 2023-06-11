import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CategoryRepository } from './category.repository';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findCategory(id: string) {
    return await this.categoryRepository.findCategory(id);
  }

  async findCategories(args = {} as Prisma.CategoryFindManyArgs) {
    return await this.categoryRepository.findCategories(args);
  }

  async createCategory(data: CreateCategoryDTO) {
    return await this.categoryRepository.createCategory(data);
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    await this.findCategory(id);
    await this.categoryRepository.updateCategory(id, data);
  }

  async deleteCategory(id: string) {
    await this.findCategory(id);
    await this.categoryRepository.deleteCategory(id);
  }
}
