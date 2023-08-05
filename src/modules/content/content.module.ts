import { Module } from '@nestjs/common';

import { CategoryRepository } from '../category/category.repository';

import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  providers: [CategoryRepository, ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
