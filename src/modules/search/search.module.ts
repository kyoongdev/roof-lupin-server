import { Module } from '@nestjs/common';

import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, SpaceRepository, RentalTypeRepository],
})
export class SearchModule {}
