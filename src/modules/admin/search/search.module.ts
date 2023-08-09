import { Module } from '@nestjs/common';

import { SearchRepository } from '@/modules/search/search.repository';

import { AdminSearchController } from './search.controller';
import { AdminSearchService } from './search.service';

@Module({
  providers: [AdminSearchService, SearchRepository],
  exports: [AdminSearchService, SearchRepository],
  controllers: [AdminSearchController],
})
export class AdminSearchModule {}
