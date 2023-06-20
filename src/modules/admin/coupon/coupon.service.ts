import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CouponRepository } from '@/modules/coupon/coupon.repository';
import { CouponDTO, CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO } from '@/modules/coupon/dto';
import { CreateUserCouponDTO } from '@/modules/coupon/dto/create-user-coupon.dto';

import { AdminException } from '../exception/admin.exception';
import {
  ADMIN_ERROR_CODE,
  ADMIN_USER_COUPON_ALREADY_EXISTS,
  ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST,
} from '../exception/errorCode';

@Injectable()
export class AdminCouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async findCoupon(id: string) {
    return await this.couponRepository.findCoupon(id);
  }

  async findPagingCoupons(paging: PagingDTO, args = {} as Prisma.CouponFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.couponRepository.countCoupons({
      where: args.where,
    });
    const coupons = await this.couponRepository.findCoupons({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<CouponDTO>(coupons, { count, paging });
  }

  async createCoupon(data: CreateCouponDTO) {
    return await this.couponRepository.createCoupon(data);
  }

  async createUserCoupon(couponId: string, data: CreateUserCouponDTO) {
    const isExist = await this.couponRepository.checkUserCoupon(couponId, data.userId);

    if (isExist) {
      throw new AdminException(ADMIN_ERROR_CODE.CONFLICT(ADMIN_USER_COUPON_ALREADY_EXISTS));
    }

    if (new Date(data.dueDate) < new Date()) {
      throw new AdminException(ADMIN_ERROR_CODE.BAD_REQUEST(ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST));
    }

    return await this.couponRepository.createUserCoupon(couponId, data);
  }

  async updateCoupon(id: string, data: UpdateCouponDTO) {
    await this.findCoupon(id);
    await this.couponRepository.updateCoupon(id, data);
  }

  async updateUserCoupon(id: string, data: UpdateUserCouponDTO) {
    await this.couponRepository.findUserCoupon(id);

    if (data.dueDate && new Date(data.dueDate) < new Date()) {
      throw new AdminException(ADMIN_ERROR_CODE.BAD_REQUEST(ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST));
    }

    await this.couponRepository.updateUserCoupon(id, data);
  }

  async deleteCoupon(id: string) {
    await this.findCoupon(id);
    await this.couponRepository.deleteCoupon(id);
  }

  async deleteUserCoupon(id: string) {
    await this.couponRepository.findUserCoupon(id);
    await this.couponRepository.deleteUserCoupon(id);
  }
}
