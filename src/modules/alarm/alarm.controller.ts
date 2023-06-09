import { Body, Post } from '@nestjs/common';

import { Coupon } from '@prisma/client';
import scheduler from 'node-schedule';
import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { ApiController } from '@/utils';

import { TestAlarmDTO } from './dto';

@ApiController('alarms', '알람')
export class AlarmController {
  constructor(private readonly database: PrismaService) {}
  @Post('test')
  @RequestApi({
    body: { type: TestAlarmDTO },
  })
  @ResponseApi({})
  async testAlarm(@Body() body: TestAlarmDTO) {
    return { hi: 'ho' };
  }
}
