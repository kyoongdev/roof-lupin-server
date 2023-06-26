import { Controller, Get, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';

import { FCMProvider } from './common/fcm';
import { FCMEvent } from './event/fcm';

@Controller()
export class AppController {
  constructor(private readonly fcmEvent: FCMEvent) {}

  @Get('/health')
  healthCheck(@Response() response: ResponseType) {
    response.status(200).json({ status: 'HEALTHY' });
  }

  @Get('')
  redirectSwagger(@Response() response: ResponseType) {
    response.redirect('/api-docs');
  }

  @Get('fcm')
  test() {
    this.fcmEvent.createReservationUsageAlarm({
      year: '2023',
      month: '6',
      day: '26',
      time: 16,
      jobId: 'jobId',
      nickname: 'nickname',
      pushToken: 'asdfas',
      spaceName: 'spaceName',
    });
    return { asdf: 'asdf' };
  }
}
