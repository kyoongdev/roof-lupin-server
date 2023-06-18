import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateSettlementDTO, SettlementDTO, UpdateSettlementDTO } from '@/modules/settlement/dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFindSettlementsQuery } from '../dto/query';

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
  async getSettlements(@Paging() paging: PagingDTO, @Query() query: AdminFindSettlementsQuery) {
    return await this.settlementService.findPagingSettlements(paging, AdminFindSettlementsQuery.generateQuery(query));
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '정산 생성하기',
      summary: '정산 생성하기 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: CreateSettlementDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSettlement(@Body() data: CreateSettlementDTO) {
    return await this.settlementService.createSettlement(data);
  }

  @Patch(':settlementId')
  @RequestApi({
    summary: {
      description: '정산 수정하기',
      summary: '정산 수정하기 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: UpdateSettlementDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateSettlement(@Param('settlementId') id: string, @Body() data: UpdateSettlementDTO) {
    await this.settlementService.updateSettlement(id, data);
  }

  @Delete(':settlementId')
  @RequestApi({
    summary: {
      description: '정산 삭제',
      summary: '정산 삭제 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteSettlement(@Param('settlementId') id: string) {
    await this.settlementService.deleteSettlement(id);
  }
}
