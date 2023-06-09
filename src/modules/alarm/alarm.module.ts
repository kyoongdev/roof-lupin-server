import { Module } from '@nestjs/common';

import { AlarmController } from './alarm.controller';
import { AlarmRepository } from './alarm.repository';
import { AlarmService } from './alarm.service';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmRepository],
})
export class AlarmModule {}
