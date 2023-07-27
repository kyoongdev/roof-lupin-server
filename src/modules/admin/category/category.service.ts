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

  async findPagingContentCategories(
    paging: PagingDTO,
    args = {} as Prisma.ContentCategoryFindManyArgs,
    userId?: string
  ) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.categoryRepository.countContentCategories({
      where: args.where,
    });
    const categories = await this.categoryRepository.findContentCategories(
      {
        where: args.where,
        skip,
        take,
      },
      userId
    );

    return new PaginationDTO<ContentCategoryDTO>(categories, { count, paging });
  }

  async createCategory(data: CreateCategoryDTO) {
    return await this.categoryRepository.createCategory(data);
  }

  async createContentCategory(data: CreateContentCategoryDTO) {
    return await this.categoryRepository.createContentCategory(data);
  }

  async createContentCategorySpace(categoryId: string, data: CreateContentCategorySpaceDTO) {
    await this.categoryRepository.findContentCategory(categoryId);
    await this.categoryRepository.createContentCategorySpace(categoryId, data);
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    await this.findCategory(id);
    return await this.categoryRepository.updateCategory(id, data);
  }

  async updateContentCategory(id: string, data: UpdateContentCategoryDTO) {
    await this.categoryRepository.findContentCategory(id);
    return await this.categoryRepository.updateContentCategory(id, data);
  }

  async updateContentCategorySpace(categoryId: string, data: UpdateContentCategorySpaceDTO) {
    await this.categoryRepository.findContentCategory(categoryId);
    await this.categoryRepository.updateContentCategorySpace(categoryId, data);
  }

  async deleteCategory(id: string) {
    await this.findCategory(id);
    await this.categoryRepository.deleteCategory(id);
  }

  async deleteContentCategory(id: string) {
    await this.categoryRepository.findContentCategory(id);
    await this.categoryRepository.deleteContentCategory(id);
  }

  async deleteContentCategorySpace(categoryId: string, spaceId: string) {
    await this.categoryRepository.findContentCategory(categoryId);
    await this.categoryRepository.deleteContentCategorySpace(categoryId, spaceId);
  }
}
