import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@/modules/category/category.repository';

@Injectable()
export class HostCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findHomeCategories() {
    return await this.categoryRepository.findCategories({
      where: {
        isHome: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
