import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CategoryRepository } from '@/modules/category/category.repository';
import {
  ContentCategoryDTO,
  CreateCategoryDTO,
  CreateContentCategoryDTO,
  CreateContentCategorySpaceDTO,
  UpdateContentCategoryDTO,
  UpdateContentCategorySpaceDTO,
} from '@/modules/category/dto';

@Injectable()
export class AdminContentService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findContentCategory(id: string) {
    return await this.categoryRepository.findContentCategory(id);
  }

  async findContentCategories() {
    return await this.categoryRepository.findContentCategories();
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

  async createContentCategory(data: CreateContentCategoryDTO) {
    return await this.categoryRepository.createContentCategory(data);
  }

  async createContentCategorySpace(categoryId: string, data: CreateContentCategorySpaceDTO) {
    await this.categoryRepository.findContentCategory(categoryId);
    await this.categoryRepository.createContentCategorySpace(categoryId, data);
  }

  async updateContentCategory(id: string, data: UpdateContentCategoryDTO) {
    await this.categoryRepository.findContentCategory(id);
    return await this.categoryRepository.updateContentCategory(id, data);
  }

  async updateContentCategorySpace(categoryId: string, data: UpdateContentCategorySpaceDTO) {
    await this.categoryRepository.findContentCategory(categoryId);
    await this.categoryRepository.updateContentCategorySpace(categoryId, data);
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
