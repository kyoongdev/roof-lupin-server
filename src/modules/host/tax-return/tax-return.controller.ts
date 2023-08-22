import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { RequestHost } from '@/interface/role.interface';
import { TaxReturnDTO } from '@/modules/admin/dto/tax-return';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostTaxReturnService } from './tax-return.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('tax-returns', '[호스트] 세금신고')
export class HostTaxReturnController {
  constructor(private readonly taxReturnService: HostTaxReturnService) {}

  @Get(':taxReturnId/detail')
  @RequestApi({
    summary: {
      description: '세금신고 조회',
      summary: '세금신고 조회',
    },
  })
  @ResponseApi({
    type: TaxReturnDTO,
  })
  async findTaxReturn(@ReqUser() host: RequestHost, @Param('taxReturnId') id: string) {
    return this.taxReturnService.findTaxReturn(id, host.id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '세금신고 조회',
      summary: '세금신고 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: TaxReturnDTO,
    isPaging: true,
  })
  async findTaxReturns(@ReqUser() host: RequestHost, @Paging() paging: PagingDTO) {
    return this.taxReturnService.findPagingTaxReturns(paging, host.id);
  }
}
