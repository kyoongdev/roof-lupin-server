import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { SettlementDTO } from '@/modules/settlement/dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminSettlementService } from './settlement.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins/settlements', '[관리자] 정산')
export class AdminSettlementController {
  constructor(private readonly settlementService: AdminSettlementService) {}

  @Get(':settlementId/detail')
  @RequestApi({
    summary: {
      description: '정산 상세 조회하기',
      summary: '정산 상세 조회하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SettlementDTO,
  })
  async getSettlementDetail(@Param('settlementId') id: string) {
    return await this.settlementService.findSettlement(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '정산 조회하기',
      summary: '정산 조회하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SettlementDTO,
    isPaging: true,
  })
  async getSettlements(@Paging() paging: PagingDTO) {
    return await this.settlementService.findPagingSettlements(paging);
  }
}
