import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, IdsDTO, ResponseWithIdDTO } from '@/common';
import { CreateSearchRecommendDTO, SearchRecommendDTO, UpdateSearchRecommendDTO } from '@/modules/search/dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminSearchService } from './search.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('/search', '[관리자] 검색어 관리')
export class AdminSearchController {
  constructor(private readonly searchService: AdminSearchService) {}

  @Get('/recommends/:searchRecommendId/detail')
  @RequestApi({
    summary: {
      description: '추천 검색어 자세히 불러오기',
      summary: '추천 검색어 자세히 불러오기',
    },
  })
  @ResponseApi({
    type: SearchRecommendDTO,
  })
  async getSearchRecommend(@Param('searchRecommendId') id: string) {
    return await this.searchService.findSearchRecommend(id);
  }

  @Get('/recommends')
  @RequestApi({
    summary: {
      description: '추천 검색어 리스트 불러오기',
      summary: '추천 검색어 리스트 불러오기',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: SearchRecommendDTO,
    isPaging: true,
  })
  async getPagingSearchRecommends(@Paging() paging: PagingDTO) {
    return await this.searchService.findPagingSearchRecommends(paging);
  }

  @Post('/recommends')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '추천 검색어 생성하기',
      summary: '추천 검색어 생성하기',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSearchRecommend(@Body() body: CreateSearchRecommendDTO) {
    return await this.searchService.createSearchRecommend(body);
  }

  @Patch('/recommends/:searchRecommendId')
  @RequestApi({
    summary: {
      description: '추천 검색어 수정하기',
      summary: '추천 검색어 수정하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateSearchRecommend(@Param('searchRecommendId') id: string, @Body() body: UpdateSearchRecommendDTO) {
    await this.searchService.updateSearchRecommend(id, body);
  }

  @Delete('/recommends')
  @RequestApi({
    summary: {
      description: '추천 검색어 삭제하기',
      summary: '추천 검색어 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteSearchRecommend(@Query() query: IdsDTO) {
    await Promise.all(query.ids.split(',').map((id) => this.searchService.deleteSearchRecommend(id)));
  }
}
