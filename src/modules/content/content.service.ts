import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class ContentService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findContentCategory(id: string) {
    return await this.categoryRepository.findContentCategory(id);
  }
}
