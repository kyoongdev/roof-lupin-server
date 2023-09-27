import { Module } from '@nestjs/common';

import { PortOneProvider } from '@/utils';

import { CouponRepository } from '../coupon/coupon.repository';
import { QnARepository } from '../qna/qna.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReviewRepository } from '../review/review.repository';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [
    PortOneProvider,
    UserService,
    UserRepository,
    QnARepository,
    ReservationRepository,
    CouponRepository,
    ReviewRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
