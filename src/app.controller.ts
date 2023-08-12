import { Controller, Get, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Response as ResponseType } from 'express';

import { PrismaService } from './database/prisma.service';
@Controller()
export class AppController {
  constructor(private readonly database: PrismaService, private readonly configService: ConfigService) {}

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

  @Get('/test')
  async test2() {
    return { asdf: 'asdf' };
  }
}
