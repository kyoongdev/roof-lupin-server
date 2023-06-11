import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryRepository, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
