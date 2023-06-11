import { Module } from '@nestjs/common';

import { CategoryRepository } from './category.repository';

@Module({
  providers: [CategoryRepository],
})
export class CategoryModule {}
