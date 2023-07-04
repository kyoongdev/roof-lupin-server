import { Module } from '@nestjs/common';

import { SettlementRepository } from '../host/settlement/settlement.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, SpaceRepository, RentalTypeRepository],
})
export class ReservationModule {}
