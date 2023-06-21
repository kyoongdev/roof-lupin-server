import { Get, Param, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { BlockedTimeService } from './blocked-time.service';
import { BlockedTimeDTO } from './dto';
import { FindBlockedTimesQuery } from './dto/query';

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
}
