import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { SpaceDetailDTO, SpaceDTO } from '@/modules/space/dto';
import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { RentalTypeDTO, UpdateRentalTypeDTO } from '@/modules/space/dto/rentalType';
import { UpdateSpaceDTO } from '@/modules/space/dto/update-space.dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostSpaceService } from './space.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('spaces', '[호스트] 공간 관리')
export class HostSpaceController {
  constructor(private readonly spaceService: HostSpaceService) {}

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
    isArray: true,
  })
  async getSpaces(@ReqUser() user: RequestHost) {
    return await this.spaceService.findSpaces(user.id);
  }

  @Get('paging')
  @RequestApi({
    summary: {
      description: '공간 목록 페이징 조회',
      summary: '공간 목록 페이징 조회 - 호스트만 사용가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isPaging: true,
  })
  async getPagingSpaces(@Paging() paging: PagingDTO, @ReqUser() user: RequestHost) {
    return await this.spaceService.findPagingSpaces(paging, user.id);
  }

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
  async updateSpace(@ReqUser() user: RequestHost, @Param('spaceId') id: string, @Body() body: UpdateSpaceDTO) {
    await this.spaceService.updateSpace(id, user.id, body);
  }

  @Patch(':spaceId/rental-type/:rentalTypeId')
  @RequestApi({
    summary: {
      description: '공간 대여 정보 수정',
      summary: '공간 대여정보 수정 수정 - 호스트만 사용가능합니다.',
    },
    body: {
      type: UpdateRentalTypeDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRentalType(
    @ReqUser() user: RequestHost,
    @Param('rentalTypeId') rentalTypeId: string,
    @Param('spaceId') spaceId: string,
    @Body() body: UpdateRentalTypeDTO
  ) {
    await this.spaceService.updateRentalType(spaceId, rentalTypeId, user.id, body);
  }

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
