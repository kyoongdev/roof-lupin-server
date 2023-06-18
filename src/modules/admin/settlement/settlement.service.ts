import { Injectable } from '@nestjs/common';

import { SettlementRepository } from '@/modules/settlement/settlement.repository';

@Injectable()
export class AdminSettlementService {
  constructor(private readonly settlementRepository: SettlementRepository) {}
}
