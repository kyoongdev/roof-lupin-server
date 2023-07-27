import { Delete, Get, Param } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { SpaceDTO } from '../space/dto';

import { SearchRecommendDTO, SearchRecordDTO } from './dto';
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

  @Get('recent/spaces')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '최근 검색한 공간 조회',
      summary: '최근 검색한 공간 조회 - 유저만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isArray: true,
  })
  async getRecentSearchSpaces(@ReqUser() user: RequestUser) {
    return await this.searchService.findMyRecentSpace(user.id);
  }
}
