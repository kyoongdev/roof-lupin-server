import { ApiController } from '@/utils';

import { AdminSettlementService } from './settlement.service';

@ApiController('admins/settlements', '[관리자] 정산')
export class AdminSettlementController {
  constructor(private readonly settlementService: AdminSettlementService) {}
}
