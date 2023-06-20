import { Module } from '@nestjs/common';

import { BlockedTimeController } from './blocked-time.controller';
import { BlockedTimeRepository } from './blocked-time.repository';
import { BlockedTimeService } from './blocked-time.service';

@Module({
  providers: [BlockedTimeService, BlockedTimeRepository],
  controllers: [BlockedTimeController],
})
export class BlockedTimeModule {}
