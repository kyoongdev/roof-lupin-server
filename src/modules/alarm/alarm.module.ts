import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';

import { AlarmController } from './alarm.controller';
import { AlarmRepository } from './alarm.repository';
import { AlarmService } from './alarm.service';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmRepository, FCMEvent],
})
export class AlarmModule {}
