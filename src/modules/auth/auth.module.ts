import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SocialLoginModule } from 'cumuco-nestjs';

import { EncryptProvider } from '@/common/encrypt';
import { FCMEvent } from '@/event/fcm';
import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

import { CouponRepository } from '../coupon/coupon.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const config = new ConfigService();

@Module({
  imports: [
    SocialLoginModule.forRoot({
      kakao: {
        adminKey: config.get('KAKAO_ADMIN_KEY'),
        redirectUrl: config.get('KAKAO_REDIRECT_URL'),
        restKey: config.get('KAKAO_REST_KEY'),
        secretKey: config.get('KAKAO_SECRET_KEY'),
      },
      naver: {
        clientId: config.get('NAVER_CLIENT_ID'),
        clientSecret: config.get('NAVER_CLIENT_SECRET'),
        redirectUrl: config.get('NAVER_REDIRECT_URL'),
      },
      apple: {
        appleConfig: {
          client_id: config.get('APPLE_CLIENT_ID'),
          key_id: config.get('APPLE_KEY_ID'),
          redirect_uri: config.get('APPLE_REDIRECT_URL'),
          scope: 'name email',
          team_id: config.get('APPLE_TEAM_ID'),
        },
        path: '../../config/appleAuthKey.p8',
      },
    }),
  ],
  providers: [AuthService, UserRepository, Jsonwebtoken, CouponRepository, FCMEvent],
  controllers: [AuthController],
})
export class AuthModule {}
