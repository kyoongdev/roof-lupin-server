import { ConflictException, Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';
import { RequestUser } from '@/interface/role.interface';

import { CouponRepository } from './coupon.repository';
import { RegisterCouponByCodeDTO, UserCouponCountDTO, UserCouponDTO } from './dto';

@Injectable()
export class CouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly fcmEvent: FCMEvent,
    private readonly database: PrismaService
  ) {}

  async findUserCoupon(id: string) {
    return await this.couponRepository.findUserCoupon(id);
  }

  async findPagingUserCoupons(paging: PagingDTO, userId: string) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.couponRepository.countUserCoupons({
      where: {
        userId,
        deletedAt: null,
      },
    });
    const coupons = await this.couponRepository.findUserCoupons({
      where: {
        userId,
        deletedAt: null,
      },
      skip,
      take,
    });
    return new PaginationDTO<UserCouponDTO>(coupons, { count, paging });
  }
  async countUserCoupons(userId: string) {
    const count = await this.couponRepository.countUserCoupons({
      where: {
        userId,
        deletedAt: null,
      },
    });

    return new UserCouponCountDTO({
      count,
    });
  }

  async registerCouponByCode(user: RequestUser, data: RegisterCouponByCodeDTO) {
    const coupon = await this.couponRepository.findCouponByCode(data.code);
    const userCoupon = await this.couponRepository.findUserCouponByCode(data.code);

    if (userCoupon) {
      throw new ConflictException('이미 등록된 쿠폰입니다.');
    }

    const now = new Date();

    const usageDateStartAt = new Date(coupon.defaultDueDateStart) || new Date(now);

    const usageDateEndAt = new Date(now.setDate(now.getDate() + coupon.defaultDueDay));
    const userCouponId = await this.couponRepository.createUserCoupon(coupon.id, {
      userId: user.id,
      usageDateStartAt,
      usageDateEndAt,
    });

    if (user && user.isAlarmAccepted && user.pushToken) {
      this.fcmEvent.createCouponDurationAlarm({
        dueDate: usageDateEndAt,
        jobId: `${user.id}_${userCouponId}`,
        userId: user.id,
        nickname: user.nickname,
      });
    }

    return userCouponId;
  }
}
