import { Body, Delete, Get, Param, Post } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateSearchRecordDTO, SearchRecommendDTO, SearchRecordDTO } from './dto';
import { SearchService } from './search.service';

@ApiController('search', '검색어')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('records')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '최근 검색어 조회',
      summary: '최근 검색어 조회 - 유저만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SearchRecordDTO,
    isArray: true,
  })
  async getSearchRecords(@ReqUser() user: RequestUser) {
    return await this.searchService.findSearchRecords({
      where: {
        userId: user.id,
      },
    });
  }

  @Get('recommends')
  @RequestApi({
    summary: {
      description: '인기 검색어 조회',
      summary: '인기 검색어 조회',
    },
  })
  @ResponseApi({
    type: SearchRecommendDTO,
    isArray: true,
  })
  async getSearchRecommends() {
    return await this.searchService.findSearchRecommends({});
  }

  @Post('records')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '검색어 저장',
      summary: '검색어 저장 - 유저만 사용 가능합니다.',
    },
    body: {
      type: CreateSearchRecordDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSearchRecord(@ReqUser() user: RequestUser, @Body() body: CreateSearchRecordDTO) {
    return await this.searchService.createSearchRecord(user.id, body);
  }

  @Delete('records/:searchRecordId')
  @RequestApi({
    summary: {
      description: '검색어 삭제',
      summary: '검색어 삭제 - 유저만 사용 가능합니다.',
    },
    params: {
      name: 'searchRecordId',
      description: '검색어 아이디',
      required: true,
      type: 'string',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteSearchRecord(@ReqUser() user: RequestUser, @Param('searchRecordId') id: string) {
    return await this.searchService.deleteSearchRecord(id, user.id);
  }

  @Delete('records')
  @RequestApi({
    summary: {
      description: '검색어 전체 삭제',
      summary: '검색어 전체 삭제 - 유저만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteAllSearchRecord(@ReqUser() user: RequestUser) {
    return await this.searchService.deleteAllSearchRecords(user.id);
  }

  @Post('recommends')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '인기 검색어 생성',
      summary: '인기 검색어 생성 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: CreateSearchRecordDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSearchRecommend(@Body() body: CreateSearchRecordDTO) {
    return await this.searchService.createSearchRecommend(body);
  }

  @Delete('recommends/:searchRecommendId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '인기 검색어 삭제',
      summary: '인기 검색어 삭제 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'searchRecommendId',
      description: '인기 검색어 아이디',
      required: true,
      type: 'string',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteSearchRecommend(@Param('searchRecommendId') id: string) {
    return await this.searchService.deleteSearchRecommend(id);
  }
}
