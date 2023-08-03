import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';

import { CouponController } from './coupon.controller';
import { CouponRepository } from './coupon.repository';
import { CouponService } from './coupon.service';

@Module({
  controllers: [CouponController],
  providers: [CouponService, CouponRepository, FCMEvent],
})
export class CouponModule {}
