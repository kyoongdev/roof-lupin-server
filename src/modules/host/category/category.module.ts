import { Module } from '@nestjs/common';

import { CategoryRepository } from '@/modules/category/category.repository';

import { HostCategoryController } from './category.controller';
import { HostCategoryService } from './category.service';

@Module({
  providers: [CategoryRepository, HostCategoryService],
  controllers: [HostCategoryController],
})
export class HostCategoryModule {}
