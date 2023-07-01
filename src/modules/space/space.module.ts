import { Module } from '@nestjs/common';

import { HolidayService } from '../holiday/holiday.service';
import { BlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { LocationRepository } from '../location/location.repository';
import { ReservationRepository } from '../reservation/reservation.repository';

import { RentalTypeController } from './rentalType/rentalType.controller';
import { RentalTypeRepository } from './rentalType/rentalType.repository';
import { RentalTypeService } from './rentalType/rentalType.service';
import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [
    SpaceService,
    SpaceRepository,
    RentalTypeService,
    LocationRepository,
    ReservationRepository,
    RentalTypeRepository,
    BlockedTimeRepository,
    HolidayService,
  ],
  controllers: [SpaceController, RentalTypeController],
})
export class SpaceModule {}
