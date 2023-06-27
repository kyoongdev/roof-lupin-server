import { Controller, Get, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';

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
    this.fcmEvent.createQnAAnswerAlarm({
      pushToken:
        'cFk0PIyjgU9Ls_syUneKGp:APA91bHGiUamBsWmDiJyC2xx7gWJUIT_D-WtSqHK_39Hm7nTSuvnm2j-lhAdYLm82uqsK99vlSr_ktEQosF8ikldxIaddNQ-Rr0SakxZjD3_kjH-ZozPAXO_XHgXj0DqdouD80rbGBWn',
      nickname: 'ㅁㄴㄹㄴㅁㅇ',
      spaceName: 'ㅁㄴㅇㄹㄴㅁ',
      userId: '',
    });
    return { asdf: 'asdf' };
  }
}
