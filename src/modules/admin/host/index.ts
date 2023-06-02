import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { HostDTO } from '@/modules/host/dto';
import { HostDetailDTO } from '@/modules/host/dto/host-detail.dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminHostService } from './host.service';

@ApiController('admins/hosts', '[호스트] 관리')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
export class AdminHostController {
  constructor(private readonly hostService: AdminHostService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '호스트 목록 조회',
      summary: '호스트 목록 조회 - 관리자만 사용 가능',
    },
  })
  @ResponseApi({
    type: HostDTO,
    isPaging: true,
  })
  async getHosts(@Paging() paging: PagingDTO) {
    return await this.hostService.findPagingHosts(paging);
  }

  @Get(':hostId/detail')
  @RequestApi({
    summary: {
      description: '호스트 상세 조회',
      summary: '호스트 상세 조회 - 관리자만 사용 가능',
    },
    params: {
      name: 'hostId',
      description: '호스트 아이디',
      required: true,
      type: 'string',
    },
  })
  @ResponseApi({
    type: HostDetailDTO,
  })
  async getHostDetail(@Param('hostId') hostId: string) {
    return await this.hostService.findHost(hostId);
  }
}
