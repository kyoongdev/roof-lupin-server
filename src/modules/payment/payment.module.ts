import { Module } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';
import { PortOneProvider } from '@/common/payment/port-one';
import { TossPayProvider } from '@/common/payment/toss';

import { BlockedTimeRepository } from '../blocked-time/blocked-time.repository';
import { CouponRepository } from '../coupon/coupon.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { RentalTypeService } from '../space/rentalType/rentalType.service';
import { SpaceRepository } from '../space/space.repository';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [
    TossPayProvider,
    KakaoPayProvider,
    PortOneProvider,
    PaymentService,
    ReservationRepository,
    RentalTypeRepository,
    CouponRepository,
    BlockedTimeRepository,
    RentalTypeService,
    SpaceRepository,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
