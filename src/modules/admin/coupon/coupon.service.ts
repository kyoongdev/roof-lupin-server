import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CategoryRepository } from '@/modules/category/category.repository';
import { CouponRepository } from '@/modules/coupon/coupon.repository';
import { CouponDTO, CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO, UserCouponDTO } from '@/modules/coupon/dto';
import { CreateUserCouponDTO } from '@/modules/coupon/dto/create-user-coupon.dto';

import { AdminException } from '../exception/admin.exception';
import {
  ADMIN_ERROR_CODE,
  ADMIN_USER_COUPON_ALREADY_EXISTS,
  ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST,
} from '../exception/errorCode';

@Injectable()
export class AdminCouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

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

  async findUserCoupon(id: string) {
    return await this.couponRepository.findUserCoupon(id);
  }
  async findPagingUserCoupons(paging: PagingDTO, args = {} as Prisma.UserCouponFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.couponRepository.countUserCoupons({
      where: args.where,
    });
    const coupons = await this.couponRepository.findUserCoupons({
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<UserCouponDTO>(coupons, { count, paging });
  }

  async createCoupon(data: CreateCouponDTO) {
    if (data.categoryIds) {
      await Promise.all(data.categoryIds.map(async (id) => await this.categoryRepository.findCategory(id)));
    }
    return await this.couponRepository.createCoupon(data);
  }

  async createUserCoupon(couponId: string, data: CreateUserCouponDTO) {
    const isExist = await this.couponRepository.checkUserCoupon(couponId, data.userId);

    if (isExist) {
      throw new AdminException(ADMIN_ERROR_CODE.CONFLICT(ADMIN_USER_COUPON_ALREADY_EXISTS));
    }

    return await this.couponRepository.createUserCoupon(couponId, data);
  }

  async updateCoupon(id: string, data: UpdateCouponDTO) {
    await this.findCoupon(id);
    if (data.categoryIds) {
      await Promise.all(data.categoryIds.map(async (id) => await this.categoryRepository.findCategory(id)));
    }
    await this.couponRepository.updateCoupon(id, data);
  }

  async updateUserCoupon(id: string, data: UpdateUserCouponDTO) {
    await this.couponRepository.findUserCoupon(id);
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
