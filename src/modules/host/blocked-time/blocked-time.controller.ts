import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from '../dto/blocked-time';
import { FindBlockedTimesQuery } from '../dto/blocked-time/query';

import { BlockedTimeService } from './blocked-time.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('blocked-times', '[호스트] 시간 차단')
export class BlockedTimeController {
  constructor(private readonly blockedTimeService: BlockedTimeService) {}

  @Get(':blockedTimeId/detail')
  @RequestApi({
    summary: {
      description: '공간 차단된 시간 자세히 구하기',
      summary: '공간 차단된 시간 자세히 구하기 - 호스트만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: BlockedTimeDTO,
  })
  async getBlockedTime(@Param('blockedTimeId') id: string) {
    return await this.blockedTimeService.findBlockedTime(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '공간 차단된 시간 목록 구하기',
      summary: '공간 차단된 시간 목록 구하기 - 호스트만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: BlockedTimeDTO,
    isPaging: true,
  })
  async getBlockedTimes(@Paging() paging: PagingDTO, @Query() query: FindBlockedTimesQuery) {
    return await this.blockedTimeService.findPagingBlockedTimes(paging, FindBlockedTimesQuery.generateQuery(query));
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공간 시간 차단하기',
      summary: '공간 시간 차단하기 - 호스트만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createBlockedTime(@ReqUser() user: RequestHost, @Body() body: CreateBlockedTimeDTO) {
    return await this.blockedTimeService.createBlockedTime(user.id, body);
  }

  @Patch(':blockTimeId')
  @RequestApi({
    summary: {
      description: '공간 시간 차단 수정하기',
      summary: '공간 시간 차단 수정하기 - 호스트만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateBlockedTime(
    @Param('blockTimeId') id: string,
    @ReqUser() user: RequestHost,
    @Body() body: UpdateBlockedTimeDTO
  ) {
    return await this.blockedTimeService.updateBlockedTime(id, user.id, body);
  }

  @Delete(':blockTimeId')
  @RequestApi({
    summary: {
      description: '공간 시간 차단 삭제하기',
      summary: '공간 시간 차단 삭제하기 - 호스트만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteBlockedTime(@Param('blockTimeId') id: string, @ReqUser() user: RequestHost) {
    return await this.blockedTimeService.deleteBlockedTime(id, user.id);
  }
}
