import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CategoryRepository } from './category.repository';
import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { CategoryException } from './exception/category.exception';
import { CATEGORY_ERROR_CODE, HOME_CATEGORY_COUNT, HOME_CATEGORY_ICON_PATH_BAD_REQUEST } from './exception/errorCode';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findCategory(id: string) {
    return await this.categoryRepository.findCategory(id);
  }

  async findCategories(args = {} as Prisma.CategoryFindManyArgs) {
    return await this.categoryRepository.findCategories(args);
  }

  async findPagingCategories(paging: PagingDTO, args = {} as Prisma.CategoryFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.categoryRepository.countCategories({
      where: {
        ...args.where,
      },
    });
    const categories = await this.categoryRepository.findCategories({
      skip,
      take,

      ...args,
    });

    return new PaginationDTO<CategoryDTO>(categories, { count, paging });
  }

  async createCategory(data: CreateCategoryDTO) {
    const homeCategoryCount = await this.categoryRepository.countCategories({
      where: {
        isHome: true,
      },
    });

    if (homeCategoryCount === 5) {
      throw new CategoryException(CATEGORY_ERROR_CODE.CONFLICT(HOME_CATEGORY_COUNT));
    }

    if (data.isHome === true && !data.iconPath) {
      throw new CategoryException(CATEGORY_ERROR_CODE.BAD_REQUEST(HOME_CATEGORY_ICON_PATH_BAD_REQUEST));
    }

    return await this.categoryRepository.createCategory(data);
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    await this.findCategory(id);

    if (data.isHome === true) {
      if (!data.iconPath) {
        throw new CategoryException(CATEGORY_ERROR_CODE.BAD_REQUEST(HOME_CATEGORY_ICON_PATH_BAD_REQUEST));
      }
      const homeCategoryCount = await this.categoryRepository.countCategories({
        where: {
          isHome: true,
        },
      });

      if (homeCategoryCount === 5) {
        throw new CategoryException(CATEGORY_ERROR_CODE.CONFLICT(HOME_CATEGORY_COUNT));
      }
    }

    await this.categoryRepository.updateCategory(id, data);
  }

  async deleteCategory(id: string) {
    await this.findCategory(id);
    await this.categoryRepository.deleteCategory(id);
  }
}
