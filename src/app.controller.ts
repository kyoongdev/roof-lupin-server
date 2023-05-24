import type { Response as ResponseType } from 'express';
import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  healthCheck(@Response() response: ResponseType) {
    response.status(200).json({ status: 'HEALTHY' });
  }

  @Get('/test')
  test() {
    return this.appService.getHello();
  }
}
