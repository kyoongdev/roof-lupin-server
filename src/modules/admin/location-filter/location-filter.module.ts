import { Module } from '@nestjs/common';

import { LocationFilterRepository } from '@/modules/location-filter/location-filter.repository';

import { AdminLocationFilterController } from './location-filter.controller';
import { AdminLocationFilterService } from './location-filter.service';

@Module({
  providers: [AdminLocationFilterService, LocationFilterRepository],
  exports: [AdminLocationFilterService, LocationFilterRepository],
  controllers: [AdminLocationFilterController],
})
export class AdminLocationFilterModule {}
