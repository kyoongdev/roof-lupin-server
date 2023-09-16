import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';

import { CouponController } from './coupon.controller';
import { CouponRepository } from './coupon.repository';
import { CouponService } from './coupon.service';

@Module({
  controllers: [CouponController],
  providers: [CouponService, CouponRepository, MessageEvent],
})
export class CouponModule {}
