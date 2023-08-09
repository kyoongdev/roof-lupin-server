import { Module } from '@nestjs/common';

import { CategoryRepository } from '@/modules/category/category.repository';

import { AdminCategoryController } from './category.controller';
import { AdminCategoryService } from './category.service';

@Module({
  providers: [AdminCategoryService, CategoryRepository],
  controllers: [AdminCategoryController],
  exports: [AdminCategoryService, CategoryRepository],
})
export class AdminCategoryModule {}
