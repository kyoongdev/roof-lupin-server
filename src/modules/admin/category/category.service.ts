import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@/modules/category/category.repository';

@Injectable()
export class AdminCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
}
