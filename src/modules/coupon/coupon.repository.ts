import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

import { PrismaService } from '@/database/prisma.service';

import { CouponDTO } from './dto';
import { CouponException } from './exception/coupon.exception';
import { COUPON_ERROR_CODE, COUPON_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class CouponRepository {
  constructor(private readonly database: PrismaService) {}

  async findCoupon(id: string) {
    const coupon = await this.database.coupon.findUnique({
      where: {
        id,
      },
    });

    if (!coupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(COUPON_NOT_FOUND));
    }

    return new CouponDTO(coupon);
  }

  async countCoupons(args = {} as Prisma.CouponCountArgs) {
    return this.database.coupon.count(args);
  }

  async findCoupons(args = {} as Prisma.CouponFindManyArgs) {
    const coupons = await this.database.coupon.findMany(args);

    return coupons.map((coupon) => new CouponDTO(coupon));
  }

  async checkCouponCode() {
    let isExist = true;
    while (isExist) {
      const code = nanoid(10);
      const coupon = await this.database.coupon.findUnique({
        where: {
          code,
        },
      });
      if (!coupon) {
        isExist = false;
        return code;
      }
    }
  }
}
