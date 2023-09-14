import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SocialLocationModule, SocialLocationService } from 'cumuco-nestjs';

import { LocationService } from '@/modules/location/location.service';

import { HostLocationController } from './location.controller';
const config = new ConfigService();
@Module({
  imports: [
    SocialLocationModule.forRoot({
      kakaoRestKey: config.get('KAKAO_REST_KEY'),
      naver: {
        clientId: config.get('NAVER_CONSOLE_CLIENT_ID'),
        clientSecret: config.get('NAVER_CONSOLE_CLIENT_SECRET'),
      },
    }),
  ],
  providers: [LocationService],
  controllers: [HostLocationController],
})
export class HostLocationModule {}
