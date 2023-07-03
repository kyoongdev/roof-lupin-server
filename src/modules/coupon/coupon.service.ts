import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

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
  }
}
