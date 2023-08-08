import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { FCMEvent } from '@/event/fcm';
import { CategoryRepository } from '@/modules/category/category.repository';
import { CouponRepository } from '@/modules/coupon/coupon.repository';
import { CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO } from '@/modules/coupon/dto';
import { CreateUserCouponDTO } from '@/modules/coupon/dto/create-user-coupon.dto';

import { AdminCouponDTO, UserAdminCouponDTO } from '../dto/coupon';
import { AdminException } from '../exception/admin.exception';
import { ADMIN_ERROR_CODE, ADMIN_USER_COUPON_ALREADY_EXISTS } from '../exception/errorCode';

import { AdminCouponRepository } from './coupon.repository';

@Injectable()
export class AdminCouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly adminCouponRepository: AdminCouponRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly fcmEvent: FCMEvent
  ) {}

  async findCoupon(id: string) {
    return await this.adminCouponRepository.findCoupon(id);
  }

  async findPagingCoupons(paging: PagingDTO, args = {} as Prisma.CouponFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.adminCouponRepository.countCoupons({
      where: args.where,
    });
    const coupons = await this.adminCouponRepository.findCoupons({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<AdminCouponDTO>(coupons, { count, paging });
  }

  async findUserCoupon(id: string) {
    return await this.adminCouponRepository.findUserCoupon(id);
  }
  async findPagingUserCoupons(paging: PagingDTO, args = {} as Prisma.UserCouponFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.adminCouponRepository.countUserCoupons({
      where: args.where,
    });
    const coupons = await this.adminCouponRepository.findUserCoupons({
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<UserAdminCouponDTO>(coupons, { count, paging });
  }

  async getCouponCode() {
    return await this.couponRepository.checkCouponCode();
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

    const userCoupon = await this.couponRepository.createUserCoupon(couponId, data);

    this.fcmEvent.createCouponDurationAlarm({
      userId: data.userId,
      dueDate: userCoupon.usageDateEndAt,
      jobId: `${data.userId}_${userCoupon.id}`,
      nickname: userCoupon.user.nickname,
    });

    return userCoupon.id;
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
