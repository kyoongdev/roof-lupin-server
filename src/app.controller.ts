import { Controller, Get, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';

@Controller()
export class AppController {
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
    return { asdf: 'asdf' };
  }
}
