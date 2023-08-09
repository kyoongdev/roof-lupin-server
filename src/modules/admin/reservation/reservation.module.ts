import { Module } from '@nestjs/common';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { AdminReservationController } from './reservation.controller';
import { AdminReservationService } from './reservation.service';

@Module({
  providers: [AdminReservationService, ReservationRepository],
  exports: [AdminReservationService, ReservationRepository],
  controllers: [AdminReservationController],
})
export class AdminReservationModule {}
