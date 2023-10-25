import { Body, Delete, Get, Param, Patch, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { SpaceDetailDTO, SpaceDTO, SpaceHashTagDTO, SpaceIdsDTO, UpdateSpaceDTO } from '@/modules/space/dto';
import { ApiController } from '@/utils';
import { RevalidateApi } from '@/utils/aop/revalidate';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFindSpacesQuery } from '../dto/query/space';
import { SpaceCountDTO, UpdateSpaceOrderDTO } from '../dto/space';

import { AdminSpaceService } from './space.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('spaces', '[관리자] 공간 관리')
export class AdminSpaceController {
  constructor(private readonly spaceService: AdminSpaceService) {}

  @Get('ids')
  @RequestApi({
    summary: {
      description: '공간 id, title 불러오기',
      summary: '공간 id, title 불러오기',
    },
  })
  @ResponseApi({
    type: SpaceIdsDTO,
    isArray: true,
  })
  async getSpaceIds() {
    return await this.spaceService.findSpaceIds();
  }

  @Get('count')
  @RequestApi({
    summary: {
      description: '공간 개수 불러오기',
      summary: '공간 개수 불러오기 ',
    },
  })
  @ResponseApi({
    type: SpaceCountDTO,
  })
  async countSpaces() {
    return await this.spaceService.countSpaces();
  }

  @Get(':spaceId/hash-tags')
  @RequestApi({
    summary: {
      description: '공간 해시태그 불러오기',
      summary: '공간 해시태그 불러오기',
    },
  })
  @ResponseApi({
    type: SpaceHashTagDTO,
  })
  async getSpaceHashTags(@Param('spaceId') id: string) {
    return await this.spaceService.findSpaceHashTags(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '공간 목록 불러오기',
      summary: '공간 목록 불러오기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isPaging: true,
  })
  async getSpaces(@Paging() paging: PagingDTO, @Query() query: AdminFindSpacesQuery) {
    return await this.spaceService.findPagingSpaces(paging, query);
  }

  @Get(':spaceId/detail')
  @RequestApi({
    summary: {
      description: '공간 상세 불러오기',
      summary: '공간 상세 불러오기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDetailDTO,
  })
  async getSpace(@Param('spaceId') id: string) {
    return await this.spaceService.findSpace(id);
  }

  @Patch(':spaceId')
  @RequestApi({
    summary: {
      description: '공간 수정',
      summary: '공간 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  @RevalidateApi([
    {
      key: '/spaces/:spaceId/detail',
      index: 0,
    },
  ])
  async updateSpace(@Param('spaceId') id: string, @Body() body: UpdateSpaceDTO) {
    await this.spaceService.updateSpace(id, body);
  }

  @RevalidateApi([
    {
      key: '/spaces/:spaceId/detail',
      index: 0,
    },
  ])
  @Patch(':spaceId/order')
  @RequestApi({
    summary: {
      description: '공간 순서 변경 - 광고용',
      summary: '공간 순서 변경 - 광고용',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateSpaceOrder(@Param('spaceId') id: string, @Body() body: UpdateSpaceOrderDTO) {
    await this.spaceService.updateSpaceOrder(id, body);
  }

  @RevalidateApi([
    {
      key: 'spaces',
    },
    {
      key: 'home',
    },
  ])
  @Delete(':spaceId/order')
  @RequestApi({
    summary: {
      description: '공간 순서 변경 - 광고용',
      summary: '공간 순서 변경 - 광고용',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteSpaceOrder(@Param('spaceId') id: string) {
    await this.spaceService.deleteSpaceOrder(id);
  }

  @RevalidateApi([
    {
      key: 'spaces',
    },
    {
      key: 'home',
    },
  ])
  @Delete(':spaceId')
  @RequestApi({
    summary: {
      description: '공간 삭제',
      summary: '공간 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteSpace(@Param('spaceId') id: string) {
    await this.spaceService.deleteSpace(id);
  }
}
