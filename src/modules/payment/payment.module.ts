import { Module } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';
import { TossPayProvider } from '@/common/payment/toss';

import { ReservationRepository } from '../reservation/reservation.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [TossPayProvider, KakaoPayProvider, PaymentService, ReservationRepository, RentalTypeRepository],
  controllers: [PaymentController],
})
export class PaymentModule {}
