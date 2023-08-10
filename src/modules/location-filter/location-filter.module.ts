import { Module } from '@nestjs/common';

import { LocationFilterController } from './location-filter.controller';
import { LocationFilterRepository } from './location-filter.repository';
import { LocationFilterService } from './location-filter.service';

@Module({
  providers: [LocationFilterService, LocationFilterRepository],
  controllers: [LocationFilterController],
})
export class LocationFilterModule {}
