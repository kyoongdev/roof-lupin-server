import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import {
  CreateLocationFilterDTO,
  CreateLocationFilterGroupDTO,
  LocationFilterGroupDTO,
  UpdateLocationFilterDTO,
  UpdateLocationFilterGroupDTO,
} from '@/modules/location-filter/dto';
import { ApiController, JwtAuthGuard, ResponseWithIdInterceptor } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminLocationFilterService } from './location-filter.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('location-filters', '[관리자] 위치 필터')
export class AdminLocationFilterController {
  constructor(private readonly locationFilterService: AdminLocationFilterService) {}

  @Get('groups')
  @RequestApi({
    summary: {
      description: '위치 필터 그룹 조회',
      summary: '위치 필터 그룹 조회',
    },
  })
  @ResponseApi({
    type: LocationFilterGroupDTO,
    isArray: true,
  })
  async findLocationFilterGroups() {
    return await this.locationFilterService.findLocationFilterGroups();
  }

  @Get('groups/:groupId')
  @RequestApi({
    summary: {
      description: '위치 필터 그룹 단일 조회',
      summary: '위치 필터 그룹 단일 조회',
    },
  })
  @ResponseApi({
    type: LocationFilterGroupDTO,
  })
  async findLocationFilterGroup(@Param('groupId') id: string) {
    return await this.locationFilterService.findLocationFilterGroup(id);
  }

  @Post('groups')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '위치 필터 그룹 생성',
      summary: '위치 필터 그룹 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createLocationFilterGroup(@Body() data: CreateLocationFilterGroupDTO) {
    return await this.locationFilterService.createLocationFilterGroup(data);
  }

  @Patch('groups/:groupId')
  @RequestApi({
    summary: {
      description: '위치 필터 그룹 수정',
      summary: '위치 필터 그룹 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateLocationFilterGroup(@Param('groupId') id: string, @Body() data: UpdateLocationFilterGroupDTO) {
    await this.locationFilterService.updateLocationFilterGroup(id, data);
  }

  @Delete('groups/:groupId')
  @RequestApi({
    summary: {
      description: '위치 필터 그룹 삭제',
      summary: '위치 필터 그룹 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteLocationFilterGroup(@Param('groupId') id: string) {
    await this.locationFilterService.deleteLocationFilterGroup(id);
  }

  @Post('')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '위치 필터 생성',
      summary: '위치 필터  생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createLocationFilter(@Body() data: CreateLocationFilterDTO) {
    return await this.locationFilterService.createLocationFilter(data);
  }

  @Patch(':filterId')
  @RequestApi({
    summary: {
      description: '위치 필터  수정',
      summary: '위치 필터  수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateLocationFilter(@Param('filterId') id: string, @Body() data: UpdateLocationFilterDTO) {
    await this.locationFilterService.updateLocationFilter(id, data);
  }

  @Delete(':filterId')
  @RequestApi({
    summary: {
      description: '위치 필터 삭제',
      summary: '위치 필터 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteLocationFilter(@Param('filterId') id: string) {
    await this.locationFilterService.deleteLocationFilter(id);
  }
}
