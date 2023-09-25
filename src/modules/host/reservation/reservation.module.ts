import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { TossPayProvider } from '@/utils';

import { HostReservationController } from './reservation.controller';
import { HostReservationService } from './reservation.service';

@Module({
  providers: [HostReservationService, ReservationRepository, TossPayProvider, MessageEvent],
  exports: [HostReservationService, ReservationRepository, TossPayProvider, MessageEvent],
  controllers: [HostReservationController],
})
export class HostReservationModule {}
