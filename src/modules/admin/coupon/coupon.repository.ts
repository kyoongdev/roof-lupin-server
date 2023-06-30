import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { CreateCouponDTO, UserAdminCouponDTO } from '@/modules/coupon/dto';
import { AdminCouponDTO } from '@/modules/coupon/dto/admin-coupon.dto';
import { CouponException } from '@/modules/coupon/exception/coupon.exception';
import { COUPON_ERROR_CODE, COUPON_NOT_FOUND, USER_COUPON_NOT_FOUND } from '@/modules/coupon/exception/errorCode';

@Injectable()
export class AdminCouponRepository {
  constructor(private readonly database: PrismaService) {}

  async findCoupon(id: string) {
    const coupon = await this.database.coupon.findUnique({
      where: {
        id,
      },
      include: {
        couponCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!coupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(COUPON_NOT_FOUND));
    }
    const { couponCategories, ...rest } = coupon;
    return new AdminCouponDTO({
      ...rest,
      categories: couponCategories.map(({ category }) => category),
    });
  }

  async findCouponByCode(code: string) {
    const coupon = await this.database.coupon.findUnique({
      where: {
        code,
      },
      include: {
        couponCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!coupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(COUPON_NOT_FOUND));
    }

    const { couponCategories, ...rest } = coupon;
    return new AdminCouponDTO({
      ...rest,
      categories: couponCategories.map(({ category }) => category),
    });
  }

  async countCoupons(args = {} as Prisma.CouponCountArgs) {
    return this.database.coupon.count(args);
  }

  async findCoupons(args = {} as Prisma.CouponFindManyArgs) {
    const coupons = await this.database.coupon.findMany({
      ...args,
      include: {
        couponCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    return coupons.map((coupon) => {
      const { couponCategories, ...rest } = coupon;
      return new AdminCouponDTO({
        ...rest,
        categories: couponCategories.map(({ category }) => category),
      });
    });
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
        user: true,
        coupon: {
          include: {
            couponCategories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!userCoupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(USER_COUPON_NOT_FOUND));
    }

    return new UserAdminCouponDTO({
      ...userCoupon,
      isUsed: !!userCoupon.reservationId,
      coupon: {
        ...userCoupon.coupon,
        categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
      },
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
        user: true,
        coupon: {
          include: {
            couponCategories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!userCoupon) {
      throw new CouponException(COUPON_ERROR_CODE.NOT_FOUND(USER_COUPON_NOT_FOUND));
    }

    return new UserAdminCouponDTO({
      ...userCoupon,
      isUsed: !!userCoupon.reservationId,
      coupon: {
        ...userCoupon.coupon,
        categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
      },
    });
  }

  async countUserCoupons(args = {} as Prisma.UserCouponCountArgs) {
    return this.database.userCoupon.count(args);
  }

  async findUserCoupons(args = {} as Prisma.UserCouponFindManyArgs) {
    const userCoupons = await this.database.userCoupon.findMany({
      ...args,
      include: {
        user: true,
        coupon: {
          include: {
            couponCategories: {
              include: { category: true },
            },
          },
        },
      },
    });

    return userCoupons.map((userCoupon) => {
      return new UserAdminCouponDTO({
        ...userCoupon,
        isUsed: !!userCoupon.reservationId,
        coupon: {
          ...userCoupon.coupon,
          categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
        },
      });
    });
  }
}
