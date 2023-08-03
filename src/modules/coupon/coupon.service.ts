import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';

import { CouponRepository } from './coupon.repository';
import { RegisterCouponByCodeDTO, UserCouponDTO } from './dto';

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

  async registerCouponByCode(userId: string, data: RegisterCouponByCodeDTO) {
    const coupon = await this.couponRepository.findCouponByCode(data.code);
    const userCoupon = await this.couponRepository.findUserCouponByCode(data.code);

    if (userCoupon) {
      //TODO: 이미 등록된 쿠폰입니다?
    }

    const now = new Date();

    const usageDateStartAt = new Date(coupon.defaultDueDateStart) || new Date(now);

    const usageDateEndAt = new Date(now.setDate(now.getDate() + coupon.defaultDueDay));
    const userCouponId = await this.couponRepository.createUserCoupon(coupon.id, {
      userId,
      usageDateStartAt,
      usageDateEndAt,
    });

    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        pushToken: true,
        isAlarmAccepted: true,
        nickname: true,
      },
    });
    const targetDate = new Date(usageDateEndAt);
    targetDate.setDate(targetDate.getDate() - 5);

    user &&
      user.isAlarmAccepted &&
      user.pushToken &&
      this.fcmEvent.sendScheduleAlarm(
        {
          userId,
          pushToken: user.pushToken,
        },
        {
          targetDate,
          title: '쿠폰 기한 만료일 안내',
          body: `${user.nickname}님! 사용만료까지 얼마 안남은 쿠폰이 있어요! 쿠폰함에서 확인해보세요!`,
        }
      );

    return userCouponId;
  }
}
