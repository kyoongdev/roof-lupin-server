import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';

import { PaymentModule } from '../payment/payment.module';

import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [PaymentModule],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, MessageEvent],
})
export class ReservationModule {}
