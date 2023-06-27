import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

import { PrismaService } from '@/database/prisma.service';

import { CouponDTO, CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO, UserCouponDTO } from './dto';
import { CreateUserCouponDTO } from './dto/create-user-coupon.dto';
import { CouponException } from './exception/coupon.exception';
import { COUPON_ERROR_CODE, COUPON_NOT_FOUND, USER_COUPON_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class CouponRepository {
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
    return new CouponDTO({
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
    return new CouponDTO({
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
      return new CouponDTO({
        ...rest,
        categories: couponCategories.map(({ category }) => category),
      });
    });
  }

  async createCoupon(data: CreateCouponDTO) {
    const code = await this.checkCouponCode();
    const { categoryIds, ...rest } = data;
    const coupon = await this.database.coupon.create({
      data: {
        ...rest,
        code: rest.code || code,
        ...(categoryIds && {
          couponCategories: {
            create: categoryIds.map((categoryId) => ({
              category: {
                connect: {
                  id: categoryId,
                },
              },
            })),
          },
        }),
      },
    });

    return coupon.id;
  }

  async updateCoupon(id: string, data: UpdateCouponDTO) {
    const { categoryIds, ...rest } = data;
    const updateArgs: Prisma.CouponUpdateArgs = {
      where: {
        id,
      },
      data: {
        ...rest,
      },
    };

    if (categoryIds) {
      updateArgs.data = {
        ...updateArgs.data,
        couponCategories: {
          deleteMany: {},
          create: categoryIds.map((categoryId) => ({
            category: {
              connect: {
                id: categoryId,
              },
            },
          })),
        },
      };
    }
    const coupon = await this.database.coupon.update(updateArgs);

    return coupon.id;
  }

  async deleteCoupon(id: string) {
    const coupon = await this.database.coupon.delete({
      where: {
        id,
      },
    });

    return coupon.id;
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

    return new UserCouponDTO({
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

    return new UserCouponDTO({
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
      return new UserCouponDTO({
        ...userCoupon,
        isUsed: !!userCoupon.reservationId,
        coupon: {
          ...userCoupon.coupon,
          categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
        },
      });
    });
  }

  async createUserCoupon(couponId: string, data: CreateUserCouponDTO) {
    const { userId, ...rest } = data;
    const coupon = await this.findCoupon(couponId);

    const dueDate = new Date();
    dueDate.setUTCHours(0, 0, 0, 0);
    dueDate.setUTCDate(dueDate.getUTCDate() + coupon.defaultDueDay);

    const userCoupon = await this.database.userCoupon.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        coupon: {
          connect: {
            id: couponId,
          },
        },
        dueDate,
        ...rest,
      },
    });
    return userCoupon.id;
  }

  async updateUserCoupon(id: string, data: UpdateUserCouponDTO) {
    await this.database.userCoupon.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUserCoupon(id: string) {
    await this.database.userCoupon.delete({
      where: {
        id,
      },
    });
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
