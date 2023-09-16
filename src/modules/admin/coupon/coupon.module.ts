import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { CategoryRepository } from '@/modules/category/category.repository';
import { CouponRepository } from '@/modules/coupon/coupon.repository';

import { AdminCouponController } from './coupon.controller';
import { AdminCouponRepository } from './coupon.repository';
import { AdminCouponService } from './coupon.service';

@Module({
  providers: [AdminCouponService, AdminCouponRepository, CouponRepository, MessageEvent],
  controllers: [AdminCouponController],
  exports: [AdminCouponService, AdminCouponRepository, CouponRepository, MessageEvent],
})
export class AdminCouponModule {}
