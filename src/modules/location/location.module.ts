import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Location, LocationModule as SocialLocationModule } from 'wemacu-nestjs';

import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

const config = new ConfigService();

@Module({
  imports: [
    SocialLocationModule.forRoot({
      kakaoRestKey: config.get('KAKAO_REST_KEY'),
      naver: {
        clientId: config.get('NAVER_CLIENT_ID'),
        clientSecret: config.get('NAVER_CLIENT_SECRET'),
      },
    }),
  ],
  providers: [LocationRepository, LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
