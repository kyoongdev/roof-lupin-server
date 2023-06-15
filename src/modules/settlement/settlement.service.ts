import { Injectable } from '@nestjs/common';

import { SettlementRepository } from './settlement.repository';

@Injectable()
export class SettlementService {
  constructor(private readonly settlementRepository: SettlementRepository) {}

  async findSettlement(id: string) {
    return this.settlementRepository.findSettlement(id);
  }
}
