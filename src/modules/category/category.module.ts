import { Module } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
