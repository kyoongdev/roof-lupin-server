import { Get, Param, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { RequestHost } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { FindSettlementsQuery, HostFindSettlementWithReservationQuery } from '../dto/query';
import {
  SettlementDetailDTO,
  SettlementDetailReservationPagingDTO,
  SettlementDTO,
  SettlementMonthDTO,
} from '../dto/settlement';

import { HostSettlementService } from './settlement.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('settlements', '[호스트] 정산')
export class HostSettlementController {
  constructor(private readonly settlementService: HostSettlementService) {}

  @Get(':settlementId/detail')
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

  @Get(':settlementId/detail/reservations/paging')
  @RequestApi({
    summary: {
      description: '정산 상세 조회 - 예약 페이징',
      summary: '정산 상세 조회 - 예약 페이징',
    },
  })
  @ResponseApi({
    type: SettlementDetailReservationPagingDTO,
  })
  async findSettlementWithReservationPaging(
    @Param('settlementId') id: string,
    @Paging() paging: PagingDTO,
    @Query() query: HostFindSettlementWithReservationQuery
  ) {
    return await this.settlementService.findSettlementWithReservationsPaging(id, paging, query.generateQuery());
  }

  @Get('months')
  @RequestApi({
    summary: {
      description: '정산 월 조회',
      summary: '정산 월 조회 - 호스트만 이용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SettlementMonthDTO,
    isArray: true,
  })
  async findSettlementMonths(@ReqUser() host: RequestHost) {
    return await this.settlementService.findSettlementMonth(host.id);
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
    return await this.settlementService.findMySettlements(host.id, paging, query.generateQuery());
  }
}
