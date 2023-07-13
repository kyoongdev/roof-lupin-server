import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateRankingDTO, RankingDTO, UpdateRankingDTO } from '@/modules/ranking/dto';
import { FindRankingsQuery } from '@/modules/ranking/dto/query';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';

import { AdminRankingService } from './ranking.service';

@ApiController('rankings', '[관리자] 랭킹 컨텐츠 관리')
export class AdminRankingController {
  constructor(private readonly rankingService: AdminRankingService) {}

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

  @Get('')
  @RequestApi({
    summary: {
      description: '랭킹 목록 불러오기',
      summary: '랭킹 목록 불러오기',
    },
  })
  @ResponseApi({
    type: RankingDTO,
    isPaging: true,
  })
  async getRankings(@Paging() paging: PagingDTO, @Query() query: FindRankingsQuery) {
    return await this.rankingService.findPagingRankings(paging, query.generateQuery());
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '랭킹 생성하기',
      summary: '랭킹 생성하기',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createRanking(@Body() body: CreateRankingDTO) {
    return await this.rankingService.createRanking(body);
  }

  @Patch(':rankingId')
  @RequestApi({
    summary: {
      description: '랭킹 수정하기',
      summary: '랭킹 수정하기',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async updateRanking(@Param('rankingId') id: string, @Body() body: UpdateRankingDTO) {
    await this.rankingService.updateRanking(id, body);
  }

  @Delete(':rankingId')
  @RequestApi({
    summary: {
      description: '랭킹 삭제하기',
      summary: '랭킹 삭제하기',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteRanking(@Param('rankingId') id: string) {
    await this.rankingService.deleteRanking(id);
  }
}
