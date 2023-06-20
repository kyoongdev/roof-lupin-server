import { Controller, Get, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';

import { FCMProvider } from './common/fcm';

@Controller()
export class AppController {
  constructor(private readonly fcmProvider: FCMProvider) {}
  @Get('/health')
  healthCheck(@Response() response: ResponseType) {
    response.status(200).json({ status: 'HEALTHY' });
  }

  @Get('')
  redirectSwagger(@Response() response: ResponseType) {
    response.redirect('/api-docs');
  }

  @Get('fcm')
  test(@Response() response: ResponseType) {
    this.fcmProvider.sendMessage();
    return { asdf: 'asdf' };
  }
}
