import { Module } from '@nestjs/common';

import { LocationRepository } from '../location/location.repository';
import { SpaceRepository } from '../space/space.repository';

import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, SpaceRepository, LocationRepository],
})
export class ReservationModule {}
