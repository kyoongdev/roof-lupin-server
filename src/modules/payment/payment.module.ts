import { Module } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';

import { ReservationRepository } from '../reservation/reservation.repository';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [KakaoPayProvider, PaymentService, ReservationRepository],
  controllers: [PaymentController],
})
export class PaymentModule {}
