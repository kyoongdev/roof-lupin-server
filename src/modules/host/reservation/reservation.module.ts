import { Module } from '@nestjs/common';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { HostReservationController } from './reservation.controller';
import { HostReservationService } from './reservation.service';

@Module({
  providers: [HostReservationService, ReservationRepository],
  exports: [HostReservationService, ReservationRepository],
  controllers: [HostReservationController],
})
export class HostReservationModule {}
