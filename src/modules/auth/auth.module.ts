import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SocialLoginModule } from 'wemacu-nestjs';

import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

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
    }),
  ],
  providers: [AuthService, UserRepository, AdminRepository, HostRepository, Jsonwebtoken],
  controllers: [AuthController],
})
export class AuthModule {}
