import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';

import { UserRepository } from '../user/user.repository';

import { AlarmController } from './alarm.controller';
import { AlarmRepository } from './alarm.repository';
import { AlarmService } from './alarm.service';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmRepository, MessageEvent, UserRepository],
})
export class AlarmModule {}
