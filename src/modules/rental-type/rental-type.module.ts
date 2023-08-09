import { Module } from '@nestjs/common';

import { HolidayService } from '../holiday/holiday.service';
import { HostBlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { HostOpenHourRepository } from '../host/open-hour/open-hour.repository';
import { HostSpaceHolidayRepository } from '../host/space-holiday/space-holiday.repository';
import { SpaceRepository } from '../space/space.repository';

import { RentalTypeController } from './rental-type.controller';
import { RentalTypeRepository } from './rental-type.repository';
import { RentalTypeService } from './rental-type.service';

@Module({
  providers: [
    RentalTypeRepository,
    RentalTypeService,
    SpaceRepository,
    HostBlockedTimeRepository,
    HolidayService,
    HostSpaceHolidayRepository,
    HostOpenHourRepository,
  ],
  controllers: [RentalTypeController],
})
export class RentalTypeModule {}
