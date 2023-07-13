import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CurationDetailDTO, CurationDTO } from '@/modules/curation/dto';
import { FindCurationsQuery } from '@/modules/curation/dto/query';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';

import { AdminCreateCurationDTO, AdminUpdateCurationDTO } from '../dto/curation';

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
}
