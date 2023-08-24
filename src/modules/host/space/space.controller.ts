import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { RentalTypeDTO, UpdateRentalTypeDTO } from '@/modules/rental-type/dto';
import { SpaceDetailDTO, SpaceDTO, SpaceIdsDTO } from '@/modules/space/dto';
import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { UpdateSpaceDTO } from '@/modules/space/dto/update-space.dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { RevalidateApi } from '@/utils/aop/revalidate';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { FindSpacesQuery } from '../dto/query';

import { HostSpaceService } from './space.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('spaces', '[호스트] 공간 관리')
export class HostSpaceController {
  constructor(private readonly spaceService: HostSpaceService) {}

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

  @Get(':spaceId/detail')
  @RequestApi({
    summary: {
      description: '공간 상세 조회',
      summary: '공간 상세 조회 - 호스트만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDetailDTO,
  })
  async getSpace(@Param('spaceId') id: string, @ReqUser() user: RequestHost) {
    return await this.spaceService.findSpace(id, user.id);
  }

  @Get(':spaceId/rental-types')
  @RequestApi({
    summary: {
      description: '공간 대여 정보 조회',
      summary: '공간 대여 정보 조회 - 호스트만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: RentalTypeDTO,
    isArray: true,
  })
  async getSpaceRentalTypes(@Param('spaceId') id: string, @ReqUser() user: RequestHost) {
    return await this.spaceService.findSpaceRentalType(id, user.id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '공간 목록 조회',
      summary: '공간 목록 조회 - 호스트만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isPaging: true,
  })
  async getSpaces(@ReqUser() user: RequestHost, @Query() query: FindSpacesQuery, @Paging() paging: PagingDTO) {
    return await this.spaceService.findPagingSpaces(paging, user.id, query.generateQuery());
  }

  @Get('all')
  @RequestApi({
    summary: {
      description: '공간 목록 페이징 조회',
      summary: '공간 목록 페이징 조회 - 호스트만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isArray: true,
  })
  async getPagingSpaces(@ReqUser() user: RequestHost) {
    return await this.spaceService.findSpaces(user.id);
  }

  @RevalidateApi([
    {
      key: 'spaces',
    },
    {
      key: 'home',
    },
  ])
  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공간 등록',
      summary: '공간 등록 - 호스트만 사용가능합니다.',
    },
    body: {
      type: CreateSpaceDTO,
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async createSpace(@ReqUser() user: RequestHost, @Body() body: CreateSpaceDTO) {
    return await this.spaceService.createSpace(user.id, body);
  }

  @RevalidateApi([
    {
      key: '/spaces/:spaceId/detail',
      index: 0,
    },
    {
      key: 'home',
    },
  ])
  @Patch(':spaceId')
  @RequestApi({
    summary: {
      description: '공간 수정',
      summary: '공간 수정 - 호스트만 사용가능합니다.',
    },
    body: {
      type: UpdateSpaceDTO,
    },
    params: {
      name: 'spaceId',
      description: '공간 아이디',
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
  async updateSpace(@Param('spaceId') id: string, @ReqUser() user: RequestHost, @Body() body: UpdateSpaceDTO) {
    await this.spaceService.updateSpace(id, user.id, body);
  }

  @RevalidateApi([
    {
      key: '/spaces/:spaceId/detail',
      index: 0,
    },
  ])
  @Patch(':spaceId/rental-type/:rentalTypeId')
  @RequestApi({
    summary: {
      description: '공간 대여 정보 수정',
      summary: '공간 대여정보 수정 수정 - 호스트만 사용가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRentalType(
    @Param('spaceId') spaceId: string,
    @ReqUser() user: RequestHost,
    @Param('rentalTypeId') rentalTypeId: string,
    @Body() body: UpdateRentalTypeDTO
  ) {
    await this.spaceService.updateRentalType(spaceId, rentalTypeId, user.id, body);
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
      summary: '공간 삭제 - 호스트만 사용가능합니다.',
    },

    params: {
      name: 'spaceId',
      description: '공간 아이디',
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
  async deleteSpace(@ReqUser() user: RequestHost, @Param('spaceId') id: string) {
    await this.spaceService.deleteSpace(id, user.id);
  }

  @RevalidateApi([
    {
      key: 'spaces',
    },
    {
      key: 'home',
    },
  ])
  @Delete(':spaceId/hard')
  @RequestApi({
    summary: {
      description: '공간 삭제 [하드]',
      summary: '공간 삭제 - 호스트만 사용가능합니다.[하드]',
    },

    params: {
      name: 'spaceId',
      description: '공간 아이디',
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
  async hardDeleteSpace(@ReqUser() user: RequestHost, @Param('spaceId') id: string) {
    await this.spaceService.hardDeleteSpace(id, user.id);
  }
}
