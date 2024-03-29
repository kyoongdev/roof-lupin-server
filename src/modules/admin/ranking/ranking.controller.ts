import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import {
  CreateRankingDTO,
  CreateRankingSpaceDTO,
  RankingDTO,
  UpdateRankingDTO,
  UpdateRankingSpaceDTO,
} from '@/modules/ranking/dto';
import { FindRankingsQuery } from '@/modules/ranking/dto/query';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { RevalidateApi } from '@/utils/aop/revalidate';

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

  @RevalidateApi([{ key: 'rankings' }])
  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '랭킹 생성하기',
      summary: '랭킹 생성하기',
    },
    body: {
      type: CreateRankingDTO,
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

  @RevalidateApi([{ key: '/rankings/:rankingId/detail', index: 0 }])
  @Post(':rankingId/spaces')
  @RequestApi({
    summary: {
      description: '랭킹 공간 추가하기',
      summary: '랭킹 공간 추가하기',
    },
    params: {
      name: 'rankingId',
      type: 'string',
    },
    body: {
      type: CreateRankingSpaceDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    201
  )
  async createRankingSpace(@Param('rankingId') id: string, @Body() body: CreateRankingSpaceDTO) {
    await this.rankingService.createRankingSpace(id, body);
  }

  @RevalidateApi([{ key: '/rankings/:rankingId/detail', index: 0 }])
  @Patch(':rankingId')
  @RequestApi({
    summary: {
      description: '랭킹 수정하기',
      summary: '랭킹 수정하기',
    },
    params: {
      name: 'rankingId',
      type: 'string',
    },
    body: {
      type: UpdateRankingDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRanking(@Param('rankingId') id: string, @Body() body: UpdateRankingDTO) {
    await this.rankingService.updateRanking(id, body);
  }

  @RevalidateApi([{ key: '/rankings/:rankingId/detail', index: 0 }])
  @Patch(':rankingId/spaces')
  @RequestApi({
    summary: {
      description: '랭킹 공간 수정하기',
      summary: '랭킹 공간 수정하기',
    },
    params: {
      type: 'string',
      name: 'rankingId',
    },
    body: {
      type: UpdateRankingSpaceDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRankingSpace(@Param('rankingId') id: string, @Body() body: UpdateRankingSpaceDTO) {
    await this.rankingService.updateRankingSpace(id, body);
  }

  @RevalidateApi([{ key: 'rankings' }])
  @Delete(':rankingId')
  @RequestApi({
    summary: {
      description: '랭킹 삭제하기',
      summary: '랭킹 삭제하기',
    },
    params: {
      name: 'rankingId',
      type: 'string',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteRanking(@Param('rankingId') id: string) {
    await this.rankingService.deleteRanking(id);
  }

  @RevalidateApi([{ key: 'rankings' }])
  @Delete(':rankingId/spaces/:spaceId')
  @RequestApi({
    summary: {
      description: '랭킹 공간 삭제하기',
      summary: '랭킹 공간 삭제하기',
    },
    params: [
      {
        name: 'rankingId',
        type: 'string',
      },
      {
        name: 'spaceId',
        type: 'string',
      },
    ],
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteRankingSpace(@Param('rankingId') rankingId: string, @Param('spaceId') spaceId: string) {
    await this.rankingService.deleteRankingSpace(rankingId, spaceId);
  }
}
