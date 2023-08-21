import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { BlockHostDTO, CreateHostDTO, HostDTO, UpdateHostDTO } from '@/modules/host/dto';
import { HostDetailDTO } from '@/modules/host/dto/host-detail.dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFindHostsQuery } from '../dto/query/host';

import { AdminHostService } from './host.service';

@ApiController('hosts', '[관리자] 호스트 관리')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
export class AdminHostController {
  constructor(private readonly hostService: AdminHostService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '호스트 목록 조회',
      summary: '호스트 목록 조회 ',
    },
  })
  @ResponseApi({
    type: HostDTO,
    isPaging: true,
  })
  async getHosts(@Paging() paging: PagingDTO, @Query() query: AdminFindHostsQuery) {
    return await this.hostService.findPagingHosts(paging, query.generateQuery());
  }

  @Get(':hostId/detail')
  @RequestApi({
    summary: {
      description: '호스트 상세 조회',
      summary: '호스트 상세 조회 ',
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

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '호스트 생성',
      summary: '호스트 생성 ',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createHost(@Body() body: CreateHostDTO) {
    return await this.hostService.createHost(body);
  }

  @Patch(':hostId')
  @RequestApi({
    summary: {
      description: '호스트 수정',
      summary: '호스트 수정 ',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateHost(@Param('hostId') hostId: string, @Body() body: UpdateHostDTO) {
    return await this.hostService.updateHost(hostId, body);
  }

  @Post(':hostId/block')
  @RequestApi({
    summary: {
      description: '호스트 차단',
      summary: '호스트 차단 ',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async blockHost(@Param('hostId') hostId: string, @Body() data: BlockHostDTO) {
    return await this.hostService.blockHost(hostId, data);
  }

  @Post(':hostId/unblock')
  @RequestApi({
    summary: {
      description: '호스트 차단 해제',
      summary: '호스트 차단 해제 ',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async unBlockHost(@Param('hostId') hostId: string) {
    return await this.hostService.unBlockHost(hostId);
  }

  @Delete(':hostId')
  @RequestApi({
    summary: {
      description: '호스트 삭제',
      summary: '호스트 삭제 ',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteHost(@Param('hostId') hostId: string) {
    return await this.hostService.deleteHost(hostId);
  }
}
