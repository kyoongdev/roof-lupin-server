import { Module } from '@nestjs/common';

import { CategoryRepository } from '@/modules/category/category.repository';

import { AdminContentController } from './content.controller';
import { AdminContentService } from './content.service';

@Module({
  providers: [AdminContentService, CategoryRepository],
  exports: [AdminContentService, CategoryRepository],
  controllers: [AdminContentController],
})
export class AdminContentModule {}
