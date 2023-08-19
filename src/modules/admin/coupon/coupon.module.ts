import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { CategoryRepository } from '@/modules/category/category.repository';
import { CouponRepository } from '@/modules/coupon/coupon.repository';

import { AdminCouponController } from './coupon.controller';
import { AdminCouponRepository } from './coupon.repository';
import { AdminCouponService } from './coupon.service';

@Module({
  providers: [AdminCouponService, AdminCouponRepository, CouponRepository, FCMEvent],
  controllers: [AdminCouponController],
  exports: [AdminCouponService, AdminCouponRepository, CouponRepository, FCMEvent],
})
export class AdminCouponModule {}
