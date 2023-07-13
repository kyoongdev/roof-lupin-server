import { Body, Get, Param, Patch } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { SpaceDetailDTO, SpaceDTO } from '@/modules/space/dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { UpdateSpaceOrderDTO } from '../dto/space';

import { AdminSpaceService } from './space.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('spaces', '[관리자] 공간 관리')
export class AdminSpaceController {
  constructor(private readonly spaceService: AdminSpaceService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '공간 목록 불러오기',
      summary: '공간 목록 불러오기 - 관리자만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isPaging: true,
  })
  async getSpaces(@Paging() paing: PagingDTO) {
    return await this.spaceService.findPagingSpaces(paing);
  }

  @Get(':spaceId/detail')
  @RequestApi({
    summary: {
      description: '공간 상세 불러오기',
      summary: '공간 상세 불러오기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDetailDTO,
  })
  async getSpace(@Param('spaceId') id: string) {
    return await this.spaceService.findSpace(id);
  }

  @Patch(':spaceId/order')
  @RequestApi({
    summary: {
      description: '공간 순서 변경 - 광고용',
      summary: '공간 순서 변경 - 광고용',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateSpaceOrder(@Param('spaceId') id: string, @Body() body: UpdateSpaceOrderDTO) {
    await this.spaceService.updateSpaceOrder(id, body);
  }
}
