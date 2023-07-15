import { Module } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';
import { PortOneProvider } from '@/common/payment/port-one';
import { TossPayProvider } from '@/common/payment/toss';
import { FCMEvent } from '@/event/fcm';

import { CouponRepository } from '../coupon/coupon.repository';
import { HolidayService } from '../holiday/holiday.service';
import { BlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { SettlementRepository } from '../host/settlement/settlement.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { RentalTypeService } from '../space/rentalType/rentalType.service';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

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
    HolidayService,
    UserRepository,
    FCMEvent,
    SettlementRepository,
  ],
  controllers: [PaymentController],
  exports: [
    TossPayProvider,
    KakaoPayProvider,
    PortOneProvider,
    PaymentService,
    RentalTypeRepository,
    CouponRepository,
    BlockedTimeRepository,
    RentalTypeService,
    SpaceRepository,
    HolidayService,
    UserRepository,
    FCMEvent,
    SettlementRepository,
  ],
})
export class PaymentModule {}
