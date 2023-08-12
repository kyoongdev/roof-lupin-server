import { Module } from '@nestjs/common';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { TossPayProvider } from '@/utils';

import { HostReservationController } from './reservation.controller';
import { HostReservationService } from './reservation.service';

@Module({
  providers: [HostReservationService, ReservationRepository, TossPayProvider],
  exports: [HostReservationService, ReservationRepository, TossPayProvider],
  controllers: [HostReservationController],
})
export class HostReservationModule {}
