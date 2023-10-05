import { Controller, Get, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';
import crypto from 'crypto';
import type { Response as ResponseType } from 'express';

import { PrismaService } from './database/prisma.service';
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
}
