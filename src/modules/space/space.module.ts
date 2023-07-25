import { Module } from '@nestjs/common';

import { HolidayService } from '../holiday/holiday.service';
import { BlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { OpenHourRepository } from '../host/open-hour/open-hour.repository';
import { SearchRepository } from '../search/search.repository';

import { RentalTypeController } from './rental-type/rental-type.controller';
import { RentalTypeRepository } from './rental-type/rental-type.repository';
import { RentalTypeService } from './rental-type/rental-type.service';
import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [
    SpaceService,
    SpaceRepository,
    RentalTypeRepository,
    HolidayService,
    SearchRepository,
    RentalTypeService,
    BlockedTimeRepository,
    OpenHourRepository,
  ],
  controllers: [SpaceController, RentalTypeController],
})
export class SpaceModule {}
