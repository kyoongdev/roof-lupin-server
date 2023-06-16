import { Get, Param, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestHost } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { SettlementDetailDTO, SettlementDTO } from './dto';
import { FindSettlementsQuery } from './dto/query';
import { SettlementService } from './settlement.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('settlements', '[호스트] 정산')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Get(':settlementId')
  @RequestApi({
    summary: {
      description: '정산 상세 조회',
      summary: '정산 상세 조회 - 호스트만 이용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SettlementDetailDTO,
  })
  async findSettlement(@Param('settlementId') id: string) {
    return await this.settlementService.findSettlement(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '정산 상세 조회',
      summary: '정산 상세 조회 - 호스트만 이용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: SettlementDTO,
    isPaging: true,
  })
  async findSettlements(
    @Paging() paging: PagingDTO,
    @Query() query: FindSettlementsQuery,
    @ReqUser() host: RequestHost
  ) {
    return await this.settlementService.findMySettlements(host.id, paging, SettlementDTO.generateQuery(query));
  }
}
