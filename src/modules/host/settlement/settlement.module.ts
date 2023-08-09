import { Module } from '@nestjs/common';

import { HostSettlementController } from './settlement.controller';
import { HostSettlementRepository } from './settlement.repository';
import { HostSettlementService } from './settlement.service';

@Module({
  providers: [HostSettlementService, HostSettlementRepository],
  exports: [HostSettlementService, HostSettlementRepository],
  controllers: [HostSettlementController],
})
export class HostSettlementModule {}
