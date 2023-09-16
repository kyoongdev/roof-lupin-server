import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { PortOneProvider, TossPayProvider } from '@/utils';

import { CouponRepository } from '../coupon/coupon.repository';
import { HolidayService } from '../holiday/holiday.service';
import { HostBlockedTimeRepository } from '../host/blocked-time/blocked-time.repository';
import { HostOpenHourRepository } from '../host/open-hour/open-hour.repository';
import { HostSettlementRepository } from '../host/settlement/settlement.repository';
import { HostSpaceHolidayRepository } from '../host/space-holiday/space-holiday.repository';
import { RentalTypeRepository } from '../rental-type/rental-type.repository';
import { RentalTypeService } from '../rental-type/rental-type.service';
import { ReservationRepository } from '../reservation/reservation.repository';
import { SpaceRepository } from '../space/space.repository';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [
    TossPayProvider,
    PortOneProvider,
    PaymentService,
    ReservationRepository,
    RentalTypeRepository,
    CouponRepository,
    HostBlockedTimeRepository,
    RentalTypeService,
    SpaceRepository,
    HolidayService,
    MessageEvent,
    HostSettlementRepository,
    HostOpenHourRepository,
    HostSpaceHolidayRepository,
  ],
  controllers: [PaymentController],
  exports: [
    TossPayProvider,
    PortOneProvider,
    PaymentService,
    ReservationRepository,
    RentalTypeRepository,
    CouponRepository,
    HostBlockedTimeRepository,
    RentalTypeService,
    SpaceRepository,
    HolidayService,
    MessageEvent,
    HostSettlementRepository,
    HostOpenHourRepository,
    HostSpaceHolidayRepository,
  ],
})
export class PaymentModule {}
