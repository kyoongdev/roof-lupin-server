import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

import { PrismaService } from '@/database/prisma.service';

import { CouponDTO, CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO, UserCouponDTO } from './dto';
import { CreateUserCouponDTO } from './dto/create-user-coupon.dto';
import { CouponException } from './exception/coupon.exception';
import { COUPON_ERROR_CODE } from './exception/errorCode';

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
      throw new CouponException(COUPON_ERROR_CODE.COUPON_NOT_FOUND);
    }

    return new CouponDTO(coupon);
  }

  async findCouponByCode(code: string) {
    const coupon = await this.database.coupon.findUnique({
      where: {
        code,
      },
    });

    if (!coupon) {
      throw new CouponException(COUPON_ERROR_CODE.COUPON_NOT_FOUND);
    }

    return new CouponDTO(coupon);
  }

  async countCoupons(args = {} as Prisma.CouponCountArgs) {
    return this.database.coupon.count(args);
  }

  async findCoupons(args = {} as Prisma.CouponFindManyArgs) {
    const coupons = await this.database.coupon.findMany({
      ...args,
    });

    return coupons.map((coupon) => new CouponDTO(coupon));
  }

  async createCoupon(data: CreateCouponDTO) {
    const code = await this.checkCouponCode();

    const coupon = await this.database.coupon.create({
      data: {
        ...data,
        code: data.code || code,
      },
    });

    return coupon.id;
  }

  async updateCoupon(id: string, data: UpdateCouponDTO) {
    const updateArgs: Prisma.CouponUpdateArgs = {
      where: {
        id,
      },
      data,
    };

    const coupon = await this.database.coupon.update(updateArgs);

    return coupon.id;
  }

  async deleteCoupon(id: string) {
    await this.database.coupon.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteCoupon(id: string) {
    await this.database.coupon.delete({
      where: {
        id,
      },
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
      throw new CouponException(COUPON_ERROR_CODE.USER_COUPON_NOT_FOUND);
    }

    return new UserCouponDTO({
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
      throw new CouponException(COUPON_ERROR_CODE.USER_COUPON_NOT_FOUND);
    }

    return new UserCouponDTO({
      ...userCoupon,
      isUsed: !!userCoupon.reservationId,
    });
  }
  async checkUserCouponByCode(code: string) {
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
      return null;
    }

    return new UserCouponDTO({
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
      return new UserCouponDTO({
        ...userCoupon,
        isUsed: !!userCoupon.reservationId,
      });
    });
  }

  async createUserCoupon(couponId: string, data: CreateUserCouponDTO) {
    const { userId, ...rest } = data;
    await this.findCoupon(couponId);

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
        ...rest,
      },
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
      },
    });
    return userCoupon;
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
    await this.database.userCoupon.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteUserCoupon(id: string) {
    await this.database.userCoupon.delete({
      where: {
        id,
      },
    });
  }

  async restoreUserCoupon(id: string) {
    await this.database.userCoupon.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }

  async checkCouponCode() {
    let isExist = true;
    while (isExist) {
      const code = `${nanoid(10).toUpperCase()}`;
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
