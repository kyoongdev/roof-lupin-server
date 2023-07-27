import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateCurationSpaceDTO, CurationDetailDTO, CurationDTO } from '@/modules/curation/dto';
import { FindCurationsQuery } from '@/modules/curation/dto/query';
import { UpdateCurationSpaceDTO } from '@/modules/curation/dto/update-curation-space.dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';

import { AdminCreateCurationDTO, AdminUpdateCurationDTO, AdminUpdateCurationOrderDTO } from '../dto/curation';

import { AdminCurationService } from './curation.service';

@ApiController('/curations', '[관리자] 큐레이션 관리')
export class AdminCurationController {
  constructor(private readonly curationService: AdminCurationService) {}

  @Get(':curationId/detail')
  @RequestApi({
    summary: {
      description: '큐레이션 자세히 불러오기',
      summary: '큐레이션 자세히 불러오기',
    },
  })
  @ResponseApi({
    type: CurationDetailDTO,
  })
  async getCuration(@Param('curationId') id: string) {
    return await this.curationService.findCuration(id);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '큐레이션 목록 불러오기',
      summary: '큐레이션 목록 불러오기',
    },
  })
  @ResponseApi({
    type: CurationDTO,
    isPaging: true,
  })
  async getCurations(@Paging() paging: PagingDTO, @Query() query: FindCurationsQuery) {
    return await this.curationService.findPagingCurations(paging, query.generateQuery());
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '큐레이션 생성하기',
      summary: '큐레이션 생성하기',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createCuration(@Body() body: AdminCreateCurationDTO) {
    return await this.curationService.createCuration(body);
  }

  @Post(':curationId/spaces')
  @RequestApi({
    summary: {
      description: '큐레이션에 공간 추가하기',
      summary: '큐레이션에 공간 추가하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    200
  )
  async createCurationSpace(@Param('curationId') id: string, @Body() body: CreateCurationSpaceDTO) {
    await this.curationService.createCurationSpace(id, body);
  }

  @Patch(':curationId')
  @RequestApi({
    summary: {
      description: '큐레이션 수정하기',
      summary: '큐레이션 수정하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateCuration(@Param('curationId') id: string, @Body() data: AdminUpdateCurationDTO) {
    await this.curationService.updateCuration(id, data);
  }

  @Patch(':curationId/spaces')
  @RequestApi({
    summary: {
      description: '큐레이션 공간 수정하기',
      summary: '큐레이션 공간 수정하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    200
  )
  async updateCurationSpace(@Param('curationId') id: string, @Body() data: UpdateCurationSpaceDTO) {
    await this.curationService.updateCurationSpace(id, data);
  }

  @Patch(':curationId/order')
  @RequestApi({
    summary: {
      description: '큐레이션 순서 수정하기',
      summary: '큐레이션 순서 수정하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateCurationOrder(@Param('curationId') id: string, @Body() data: AdminUpdateCurationOrderDTO) {
    await this.curationService.updateCurationOrder(id, data.orderNo);
  }

  @Delete(':curationId')
  @RequestApi({
    summary: {
      description: '큐레이션 삭제하기',
      summary: '큐레이션 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteCuration(@Param('curationId') id: string) {
    await this.curationService.deleteCuration(id);
  }

  @Delete(':curationId/spaces/:spaceId')
  @RequestApi({
    summary: {
      description: '큐레이션 공간 삭제하기',
      summary: '큐레이션 공간 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteCurationSpace(@Param('curationId') curationId: string, @Param('spaceId') spaceId: string) {
    await this.curationService.deleteCurationSpace(curationId, spaceId);
  }
}
