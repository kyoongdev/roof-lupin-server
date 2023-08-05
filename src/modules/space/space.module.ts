import { Module } from '@nestjs/common';

import { HolidayService } from '../holiday/holiday.service';
import { BlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { OpenHourRepository } from '../host/open-hour/open-hour.repository';
import { SpaceHolidayRepository } from '../host/space-holiday/space-holiday.repository';
import { RentalTypeRepository } from '../rental-type/rental-type.repository';
import { SearchRepository } from '../search/search.repository';

import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [
    SpaceService,
    SpaceRepository,
    HolidayService,
    SearchRepository,
    BlockedTimeRepository,
    OpenHourRepository,
    SpaceHolidayRepository,
    RentalTypeRepository,
  ],
  controllers: [SpaceController],
})
export class SpaceModule {}
