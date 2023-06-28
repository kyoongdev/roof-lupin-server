import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';

import { UserRepository } from '../user/user.repository';

import { AlarmController } from './alarm.controller';
import { AlarmRepository } from './alarm.repository';
import { AlarmService } from './alarm.service';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmRepository, FCMEvent, UserRepository],
})
export class AlarmModule {}
