import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CouponRepository } from './coupon.repository';
import { RegisterCouponByCodeDTO, UserCouponDTO } from './dto';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async findUserCoupon(id: string) {
    return await this.couponRepository.findUserCoupon(id);
  }

  async findPagingUserCoupons(paging: PagingDTO, userId: string) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.couponRepository.countUserCoupons({
      where: {
        userId,
      },
    });
    const coupons = await this.couponRepository.findUserCoupons({
      where: {
        userId,
      },
      skip,
      take,
    });
    return new PaginationDTO<UserCouponDTO>(coupons, { count, paging });
  }

  async registerCouponByCode(userId: string, data: RegisterCouponByCodeDTO) {
    const coupon = await this.couponRepository.findCouponByCode(data.code);

    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    const usageDateStartAt = coupon.defaultDueDateStart || new Date(now);

    const usageDateEndAt = new Date(now.setUTCDate(now.getUTCDate() + coupon.defaultDueDay));
    const userCouponId = await this.couponRepository.createUserCoupon(coupon.id, {
      userId,
      usageDateStartAt,
      usageDateEndAt,
    });
    return userCouponId;
  }
}
