import { Module } from '@nestjs/common';

import { HolidayService } from '../holiday/holiday.service';
import { SearchRepository } from '../search/search.repository';

import { RentalTypeRepository } from './rental-type/rental-type.repository';
import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [SpaceService, SpaceRepository, RentalTypeRepository, HolidayService, SearchRepository],
  controllers: [SpaceController],
})
export class SpaceModule {}
