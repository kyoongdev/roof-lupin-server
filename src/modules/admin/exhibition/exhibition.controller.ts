import { Body, Delete, Get, Param, Patch, Post, Query, Request, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import {
  CreateExhibitionDTO,
  CreateExhibitionSpaceDTO,
  ExhibitionDetailDTO,
  ExhibitionDTO,
  UpdateExhibitionDTO,
  UpdateExhibitionOrderDTO,
  UpdateExhibitionSpaceDTO,
} from '@/modules/exhibition/dto';
import { FindExhibitionsQuery } from '@/modules/exhibition/dto/query';
import { ApiController, ResponseWithId, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminExhibitionService } from './exhibition.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('exhibitions', '[관리자] 기획전 관리')
export class AdminExhibitionController {
  constructor(private readonly exhibitionService: AdminExhibitionService) {}

  @Get(':exhibitionId/detail')
  @RequestApi({
    summary: {
      description: '기획전 상세 조회하기',
      summary: '기획전 상세 조회하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: ExhibitionDetailDTO,
  })
  async getExhibition(@Param('exhibitionId') id: string) {
    return await this.exhibitionService.findExhibition(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '기획전 조회하기',
      summary: '기획전 조회하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: ExhibitionDTO,
    isPaging: true,
  })
  async getPagingExhibitions(@Paging() paging: PagingDTO, @Query() query: FindExhibitionsQuery) {
    return await this.exhibitionService.findPagingExhibitions(paging, query.generateQuery());
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '기획전 생성하기',
      summary: '기획전 생성하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createExhibition(@Body() body: CreateExhibitionDTO) {
    return await this.exhibitionService.createExhibition(body);
  }

  @Post(':exhibitionId/spaces')
  @RequestApi({
    summary: {
      description: '기획전 공간 추가하기',
      summary: '기획전 공간 추가하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    201
  )
  async createExhibitionSpace(@Param('exhibitionId') id: string, @Body() body: CreateExhibitionSpaceDTO) {
    await this.exhibitionService.createExhibitionSpace(id, body);
  }

  @Patch(':exhibitionId')
  @RequestApi({
    summary: {
      description: '기획전 수정하기',
      summary: '기획전 수정하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateExhibition(@Param('exhibitionId') id: string, @Body() body: UpdateExhibitionDTO) {
    return await this.exhibitionService.updateExhibition(id, body);
  }

  @Patch(':exhibitionId/order')
  @RequestApi({
    summary: {
      description: '기획전 순서 수정하기',
      summary: '기획전 순서 수정하기 ',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateExhibitionOrder(@Param('exhibitionId') id: string, @Body() body: UpdateExhibitionOrderDTO) {
    return await this.exhibitionService.updateExhibitionOrder(id, body);
  }

  @Patch(':exhibitionId/spaces')
  @RequestApi({
    summary: {
      description: '기획전 공간 수정하기',
      summary: '기획전 공간 수정하기 ',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateExhibitionSpace(@Param('exhibitionId') id: string, @Body() body: UpdateExhibitionSpaceDTO) {
    return await this.exhibitionService.updateExhibitionSpace(id, body);
  }

  @Delete(':exhibitionId')
  @RequestApi({
    summary: {
      description: '기획전 삭제하기',
      summary: '기획전 삭제하기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteExhibition(@Param('exhibitionId') id: string) {
    return await this.exhibitionService.deleteExhibition(id);
  }

  @Delete(':exhibitionId/order')
  @RequestApi({
    summary: {
      description: '기획전 순서 삭제하기',
      summary: '기획전 순서 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteExhibitionOrder(@Param('exhibitionId') id: string) {
    await this.exhibitionService.deleteExhibitionOrder(id);
  }

  @Delete(':exhibitionId/spaces/:spaceId')
  @RequestApi({
    summary: {
      description: '기획전 공간 삭제하기',
      summary: '기획전 공간 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteExhibitionSpace(@Param('exhibitionId') id: string, @Param('spaceId') spaceId: string) {
    return await this.exhibitionService.deleteExhibitionSpace(id, spaceId);
  }
}
