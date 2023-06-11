import { Module } from '@nestjs/common';

import { SpaceRepository } from '../space/space.repository';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, SpaceRepository],
})
export class SearchModule {}
