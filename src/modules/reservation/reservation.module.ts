import { Module } from '@nestjs/common';

import { PaymentModule } from '../payment/payment.module';

import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [PaymentModule],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
