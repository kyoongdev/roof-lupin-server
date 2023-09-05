import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { CouponException } from '@/modules/coupon/exception/coupon.exception';
import { COUPON_ERROR_CODE, COUPON_NOT_FOUND, USER_COUPON_NOT_FOUND } from '@/modules/coupon/exception/errorCode';

import { AdminCouponDTO, UserAdminCouponDTO } from '../dto/coupon';

@Injectable()
export class AdminCouponRepository {
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

    return new AdminCouponDTO(coupon);
  }

  async findCouponByCode(code: string) {
    const coupon = await this.database.coupon.findUnique({
      where: {
        code,
      },
    });

    if (!coupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(COUPON_NOT_FOUND));
    }

    return new AdminCouponDTO(coupon);
  }

  async countCoupons(args = {} as Prisma.CouponCountArgs) {
    return this.database.coupon.count(args);
  }

  async findCoupons(args = {} as Prisma.CouponFindManyArgs) {
    const coupons = await this.database.coupon.findMany({
      ...args,
    });

    return coupons.map((coupon) => new AdminCouponDTO(coupon));
  }

  async checkUserCoupon(couponId: string, userId: string) {
    const userCoupon = await this.database.userCoupon.findFirst({
      where: {
        couponId,
        userId,
      },
    });

    return userCoupon;
  }

  async findUserCoupon(id: string) {
    const userCoupon = await this.database.userCoupon.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
        coupon: true,
      },
    });

    if (!userCoupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(USER_COUPON_NOT_FOUND));
    }

    return new UserAdminCouponDTO({
      ...userCoupon,
      isUsed: !!userCoupon.reservationId,
    });
  }

  async findUserCouponByCode(code: string) {
    const userCoupon = await this.database.userCoupon.findFirst({
      where: {
        coupon: {
          code,
        },
      },
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
        coupon: true,
      },
    });

    if (!userCoupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(USER_COUPON_NOT_FOUND));
    }

    return new UserAdminCouponDTO({
      ...userCoupon,
      isUsed: !!userCoupon.reservationId,
    });
  }

  async countUserCoupons(args = {} as Prisma.UserCouponCountArgs) {
    return this.database.userCoupon.count(args);
  }

  async findUserCoupons(args = {} as Prisma.UserCouponFindManyArgs) {
    const userCoupons = await this.database.userCoupon.findMany({
      ...args,
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
        coupon: true,
      },
    });

    return userCoupons.map((userCoupon) => {
      return new UserAdminCouponDTO({
        ...userCoupon,
        isUsed: !!userCoupon.reservationId,
      });
    });
  }
}
