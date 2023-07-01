import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtNullableAuthGuard } from '@/utils/guards';

import { ExhibitionDetailDTO, ExhibitionDTO } from './dto';
import { ExhibitionService } from './exhibition.service';

@ApiController('exhibitions', '기획전')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  @Get(':exhibitionId/detail')
  @Auth([JwtNullableAuthGuard])
  @RequestApi({
    summary: {
      description: '기획전 상세 조회',
      summary: '기획전 상세 조회',
    },
  })
  @ResponseApi({
    type: ExhibitionDetailDTO,
  })
  async getExhibition(@Param('exhibitionId') id: string, @ReqUser() user?: RequestUser) {
    return this.exhibitionService.findExhibition(id, user?.id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '기획전 목록 조회',
      summary: '기획전 목록 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ExhibitionDTO,
    isPaging: true,
  })
  async getExhibitions(@Paging() paging: PagingDTO) {
    return this.exhibitionService.findPagingExhibitions(paging);
  }
}
