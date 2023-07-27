import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SocialLocationModule } from 'cumuco-nestjs';

import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

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
  providers: [LocationRepository, LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
