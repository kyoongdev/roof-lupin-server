import { Module } from '@nestjs/common';

import { ReservationRepository } from '../reservation/reservation.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { BlockedTimeController } from './blocked-time.controller';
import { BlockedTimeRepository } from './blocked-time.repository';
import { BlockedTimeService } from './blocked-time.service';

@Module({
  providers: [BlockedTimeService, BlockedTimeRepository, ReservationRepository, SpaceRepository, RentalTypeRepository],
  controllers: [BlockedTimeController],
})
export class BlockedTimeModule {}
