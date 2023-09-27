import { Injectable } from '@nestjs/common';

import { PortOneProvider } from '@/utils';

import { CouponRepository } from '../coupon/coupon.repository';
import { QnARepository } from '../qna/qna.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReviewRepository } from '../review/review.repository';

import { CountInfoDTO, UpdateUserDTO } from './dto';
import { CertificatePhoneDTO } from './dto/certificate-phone.dto';
import { UpdateUserSettingDTO } from './dto/setting';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly qnaRepository: QnARepository,
    private readonly reservationRepository: ReservationRepository,
    private readonly couponRepository: CouponRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly portOneProvider: PortOneProvider
  ) {}

  async certificateUser(userId: string, data: CertificatePhoneDTO) {
    const result = await this.portOneProvider.validateCertification(data.imp_uid);

    if (result.phone) {
      await this.userRepository.updateUser(userId, { phoneNumber: result.phone });
    }
    const user = await this.userRepository.findUser(userId);
    return user;
  }

  async getCountInfo(userId: string) {
    const qnaCount = await this.qnaRepository.countQna({
      where: {
        userId,
        deletedAt: null,
      },
    });
    const reservationCount = await this.reservationRepository.countReservations({
      where: {
        userId,
        cancel: null,
        deletedAt: null,
      },
    });
    const couponCount = await this.couponRepository.countUserCoupons({
      where: {
        userId,
        deletedAt: null,
      },
    });
    const reviewCount = await this.reviewRepository.countReviews({
      where: {
        userId,
        deletedAt: null,
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
    await this.findUser(id);
    await this.userRepository.updateUser(id, data);
  }

  async updateSetting(userId: string, data: UpdateUserSettingDTO) {
    await this.findUser(userId);
    await this.userRepository.updateSetting(userId, data);
  }

  async deleteUser(id: string) {
    await this.findUser(id);
    await this.userRepository.deleteUser(id);
  }
}
