import { Module } from '@nestjs/common';

import { HostSettlementRepository } from '@/modules/host/settlement/settlement.repository';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { AdminSettlementController } from './settlement.controller';
import { AdminSettlementService } from './settlement.service';

@Module({
  providers: [AdminSettlementService, HostSettlementRepository, ReservationRepository],
  exports: [AdminSettlementService, HostSettlementRepository, ReservationRepository],
  controllers: [AdminSettlementController],
})
export class AdminSettlementModule {}
