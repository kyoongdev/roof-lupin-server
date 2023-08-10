import { Controller, Get, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';
import { SolapiMessageService } from 'solapi';

import { PrismaService } from './database/prisma.service';
import { seedDatabase } from './seed';
@Controller()
export class AppController {
  constructor(private readonly database: PrismaService) {}

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
