import { Module } from '@nestjs/common';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { HostSettlementController } from './settlement.controller';
import { HostSettlementRepository } from './settlement.repository';
import { HostSettlementService } from './settlement.service';

@Module({
  providers: [HostSettlementService, HostSettlementRepository, ReservationRepository],
  exports: [HostSettlementService, HostSettlementRepository],
  controllers: [HostSettlementController],
})
export class HostSettlementModule {}
