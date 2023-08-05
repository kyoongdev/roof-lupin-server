import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { FinanceProvider, TossPayProvider } from '@/utils';

import { CouponRepository } from '../coupon/coupon.repository';
import { HolidayService } from '../holiday/holiday.service';
import { BlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { OpenHourRepository } from '../host/open-hour/open-hour.repository';
import { SettlementRepository } from '../host/settlement/settlement.repository';
import { SpaceHolidayRepository } from '../host/space-holiday/space-holiday.repository';
import { RentalTypeRepository } from '../rental-type/rental-type.repository';
import { RentalTypeService } from '../rental-type/rental-type.service';
import { ReservationRepository } from '../reservation/reservation.repository';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [
    TossPayProvider,
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
    FinanceProvider,
    OpenHourRepository,
    SpaceHolidayRepository,
  ],
  controllers: [PaymentController],
  exports: [
    TossPayProvider,
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
