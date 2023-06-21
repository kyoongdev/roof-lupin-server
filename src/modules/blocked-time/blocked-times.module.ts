import { Module } from '@nestjs/common';

import { ReservationRepository } from '../reservation/reservation.repository';

import { BlockedTimeController } from './blocked-time.controller';
import { BlockedTimeRepository } from './blocked-time.repository';
import { BlockedTimeService } from './blocked-time.service';

@Module({
  providers: [BlockedTimeService, BlockedTimeRepository, ReservationRepository],
  controllers: [BlockedTimeController],
})
export class BlockedTimeModule {}
