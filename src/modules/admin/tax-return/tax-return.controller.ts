import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateTaxReturnDTO, TaxReturnDTO, UpdateTaxReturnDTO } from '../dto/tax-return';

import { AdminTaxReturnService } from './tax-return.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('tax-returns', '[관리자] 세금 계산')
export class AdminTaxReturnController {
  constructor(private readonly taxReturnService: AdminTaxReturnService) {}

  @Get(':taxReturnId/detail')
  @RequestApi({
    summary: {
      description: '세금 계산 상세 조회하기',
      summary: '세금 계산 상세 조회하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: TaxReturnDTO,
  })
  async getTaxReturn(@Param('taxReturnId') id: string) {
    return await this.taxReturnService.findTaxReturn(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '세금 계산 조회하기',
      summary: '세금 계산 조회하기 - 관리자만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: TaxReturnDTO,
    isPaging: true,
  })
  async getTaxReturns(@Paging() paging: PagingDTO) {
    return await this.taxReturnService.findPagingTaxReturns(paging);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '세금 계산 생성하기',
      summary: '세금 계산 생성하기 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: CreateTaxReturnDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createTaxReturn(@Body() body: CreateTaxReturnDTO) {
    return await this.taxReturnService.createTaxReturn(body);
  }

  @Patch(':taxReturnId')
  @RequestApi({
    summary: {
      description: '세금 계산 수정하기',
      summary: '세금 계산 수정하기 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: UpdateTaxReturnDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateTaxReturn(@Param('taxReturnId') id: string, @Body() body: UpdateTaxReturnDTO) {
    return await this.taxReturnService.updateTaxReturn(id, body);
  }

  @Delete(':taxReturnId')
  @RequestApi({
    summary: {
      description: '세금 계산 삭제하기',
      summary: '세금 계산 삭제하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteTaxReturn(@Param('taxReturnId') id: string) {
    return await this.taxReturnService.deleteTaxReturn(id);
  }
}
