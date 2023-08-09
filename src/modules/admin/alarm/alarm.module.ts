import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { AlarmRepository } from '@/modules/alarm/alarm.repository';
import { UserRepository } from '@/modules/user/user.repository';

import { AdminAlarmController } from './alarm.controller';
import { AdminAlarmService } from './alarm.service';

@Module({
  providers: [AdminAlarmService, AlarmRepository, UserRepository, FCMEvent],
  controllers: [AdminAlarmController],
  exports: [AdminAlarmService, AlarmRepository, UserRepository, FCMEvent],
})
export class AdminAlarmModule {}
