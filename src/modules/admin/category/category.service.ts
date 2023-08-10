import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CategoryRepository } from '@/modules/category/category.repository';
import {
  CategoryDTO,
  ContentCategoryDTO,
  CreateCategoryDTO,
  CreateContentCategoryDTO,
  CreateContentCategorySpaceDTO,
  UpdateCategoryDTO,
  UpdateContentCategoryDTO,
  UpdateContentCategorySpaceDTO,
} from '@/modules/category/dto';

@Injectable()
export class AdminCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findCategory(id: string) {
    return await this.categoryRepository.findCategory(id);
  }

  async findPagingCategories(paging: PagingDTO, args = {} as Prisma.CategoryFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.categoryRepository.countCategories({
      where: args.where,
    });
    const categories = await this.categoryRepository.findCategories({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<CategoryDTO>(categories, { count, paging });
  }

  async createCategory(data: CreateCategoryDTO) {
    return await this.categoryRepository.createCategory(data);
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    await this.findCategory(id);
    return await this.categoryRepository.updateCategory(id, data);
  }

  async deleteCategory(id: string) {
    await this.findCategory(id);
    await this.categoryRepository.deleteCategory(id);
  }
}
