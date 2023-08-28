import { Injectable } from '@nestjs/common';

import { CouponRepository } from '../coupon/coupon.repository';
import { QnARepository } from '../qna/qna.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReviewRepository } from '../review/review.repository';

import { CountInfoDTO, UpdateUserDTO } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly qnaRepository: QnARepository,
    private readonly reservationRepository: ReservationRepository,
    private readonly couponRepository: CouponRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async getCountInfo(userId: string) {
    const qnaCount = await this.qnaRepository.countQna({
      where: {
        userId,
      },
    });
    const reservationCount = await this.reservationRepository.countReservations({
      where: {
        userId,
      },
    });
    const couponCount = await this.couponRepository.countUserCoupons({
      where: {
        userId,
      },
    });
    const reviewCount = await this.reviewRepository.countReviews({
      where: {
        userId,
      },
    });

    return new CountInfoDTO({
      qnaCount,
      reservationCount,
      couponCount,
      reviewCount,
    });
  }

  async findUser(id: string) {
    return await this.userRepository.findUser(id);
  }

  async findMyPushToken(id: string) {
    return await this.userRepository.findUserPushToken(id);
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);
  }
}
