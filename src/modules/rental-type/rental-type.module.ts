import { Module } from '@nestjs/common';

import { HolidayService } from '../holiday/holiday.service';
import { BlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { OpenHourRepository } from '../host/open-hour/open-hour.repository';
import { SpaceHolidayRepository } from '../host/space-holiday/space-holiday.repository';
import { SpaceRepository } from '../space/space.repository';

import { RentalTypeController } from './rental-type.controller';
import { RentalTypeRepository } from './rental-type.repository';
import { RentalTypeService } from './rental-type.service';

@Module({
  providers: [
    RentalTypeRepository,
    RentalTypeService,
    SpaceRepository,
    BlockedTimeRepository,
    HolidayService,
    SpaceHolidayRepository,
    OpenHourRepository,
  ],
  controllers: [RentalTypeController],
})
export class RentalTypeModule {}
