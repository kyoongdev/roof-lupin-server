import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { AlarmRepository } from '@/modules/alarm/alarm.repository';
import { UserRepository } from '@/modules/user/user.repository';

import { AdminAlarmController } from './alarm.controller';
import { AdminAlarmService } from './alarm.service';

@Module({
  providers: [AdminAlarmService, AlarmRepository, UserRepository, MessageEvent],
  controllers: [AdminAlarmController],
  exports: [AdminAlarmService, AlarmRepository, UserRepository, MessageEvent],
})
export class AdminAlarmModule {}
