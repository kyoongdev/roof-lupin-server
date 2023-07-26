import { Get, Param } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { PagingRankingDTO, RankingDTO, RankingIdsDTO } from './dto';
import { RankingService } from './ranking.service';

@ApiController('rankings', '랭킹 ')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':rankingId/detail')
  @RequestApi({
    summary: {
      description: '랭킹 자세히 불러오기',
      summary: '랭킹 자세히 불러오기',
    },
  })
  @ResponseApi({
    type: RankingDTO,
  })
  async getRanking(@Param('rankingId') id: string) {
    return await this.rankingService.findRanking(id);
  }

  @Get(':rankingId/spaces/paging')
  @RequestApi({
    summary: {
      description: '랭킹 공간 페이징 조회',
      summary: '랭킹 공간 페이징 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: PagingRankingDTO,
  })
  async getRankingPagingSpaces(@Param('rankingId') id: string, @Paging() paging: PagingDTO) {
    return await this.rankingService.findRankingPagingSpaces(id, paging);
  }

  @Get('ids')
  @RequestApi({
    summary: {
      description: '랭킹 아이디 조회',
      summary: '랭킹 아이디 조회',
    },
  })
  @ResponseApi({
    type: RankingIdsDTO,
  })
  async getRankingIds() {
    return await this.rankingService.findRankingIds();
  }
}
