import { Module } from '@nestjs/common';

import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { SearchController } from './search.controller';
import { SearchRepository } from './search.repository';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, SpaceRepository, RentalTypeRepository, SearchRepository],
})
export class SearchModule {}
