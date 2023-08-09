import { Module } from '@nestjs/common';

import { SettlementRepository } from '@/modules/host/settlement/settlement.repository';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { AdminSettlementController } from './settlement.controller';
import { AdminSettlementService } from './settlement.service';

@Module({
  providers: [AdminSettlementService, SettlementRepository, ReservationRepository],
  exports: [AdminSettlementService, SettlementRepository, ReservationRepository],
  controllers: [AdminSettlementController],
})
export class AdminSettlementModule {}
