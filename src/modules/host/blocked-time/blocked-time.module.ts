import { Module } from '@nestjs/common';

import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { SpaceRepository } from '@/modules/space/space.repository';

import { HostBlockedTimeController } from './blocked-time.controller';
import { HostBlockedTimeRepository } from './blocked-time.repository';
import { HostBlockedTimeService } from './blocked-time.service';

@Module({
  providers: [
    HostBlockedTimeService,
    HostBlockedTimeRepository,
    ReservationRepository,
    SpaceRepository,
    RentalTypeRepository,
  ],
  exports: [
    HostBlockedTimeService,
    HostBlockedTimeRepository,
    ReservationRepository,
    SpaceRepository,
    RentalTypeRepository,
  ],
  controllers: [HostBlockedTimeController],
})
export class HostBlockedTimeModule {}
