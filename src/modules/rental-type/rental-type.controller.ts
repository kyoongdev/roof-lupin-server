import { Get, Param, Query } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { PossibleRentalTypeByMonthQuery, PossibleRentalTypeQuery } from '../space/dto/query';
import { PossibleRentalTypePagingDTO } from '../space/dto/query/possible-rental-type-paging.dto';

import { PossibleRentalTypesDTO, RentalTypeDTO, SpaceRentalTypeDTO } from './dto';
import { PaginationPossibleRentalTypesByMonthDTO } from './dto/pagination-possible-rental-types-by-month.dto';
import { FindSpaceRentalTypeQuery } from './dto/query';
import { RentalTypeService } from './rental-type.service';

@ApiController('rental-types', '대여 타입')
export class RentalTypeController {
  constructor(private readonly rentalTypeService: RentalTypeService) {}

  @Get(':spaceId/detail')
  @RequestApi({
    summary: {
      description: '공간 대여 타입 상세 조회하기',
      summary: '공간 대여 타입 상세 조회하기',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
      required: true,
    },
  })
  @ResponseApi({
    type: SpaceRentalTypeDTO,
  })
  async getSpaceRentalTypeDetail(@Param('spaceId') spaceId: string) {
    return await this.rentalTypeService.findSpaceRentalTypeDetail(spaceId);
  }

  @Get(':spaceId')
  @RequestApi({
    summary: {
      description: '공간 대여 타입  조회하기',
      summary: '공간 대여 타입  조회하기',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
      required: true,
    },
  })
  @ResponseApi({
    type: RentalTypeDTO,
    isArray: true,
  })
  async getSpaceRentalTypes(@Param('spaceId') spaceId: string, @Query() query: FindSpaceRentalTypeQuery) {
    return await this.rentalTypeService.findSpaceRentalTypes(spaceId, query);
  }

  @Get(':spaceId/possible')
  @RequestApi({
    summary: {
      description: '공간 및 날짜별 가능한 대여 타입  조회하기',
      summary: '공간 및 날짜별 가능한 대여 타입  조회하기 ',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
      required: true,
    },
  })
  @ResponseApi({
    type: PossibleRentalTypesDTO,
  })
  async getPossibleSpaceRentalTypes(@Param('spaceId') spaceId: string, @Query() query: PossibleRentalTypeQuery) {
    return await this.rentalTypeService.findPossibleRentalTypesBySpaceId(spaceId, query);
  }

  @Get(':spaceId/possible/month')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 및 날짜별 가능한 대여 타입  조회하기',
      summary: '공간 및 날짜별 가능한 대여 타입  조회하기 -유저만 사용 가능',
    },
  })
  @ResponseApi({
    type: PossibleRentalTypesDTO,
  })
  async getPossibleSpaceRentalTypesByMoth(
    @Param('spaceId') spaceId: string,
    @Query() query: PossibleRentalTypeByMonthQuery
  ) {
    return await this.rentalTypeService.findPossibleRentalTypesBySpaceIdWithMonth(spaceId, query);
  }

  @Get(':spaceId/possible/month/paging')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 및 날짜별 가능한 대여 타입  조회하기',
      summary: '공간 및 날짜별 가능한 대여 타입  조회하기 -유저만 사용 가능',
    },
  })
  @ResponseApi({
    type: PaginationPossibleRentalTypesByMonthDTO,
  })
  async getPagingPossibleSpaceRentalTypesByMoth(
    @Param('spaceId') spaceId: string,
    @Query() query: PossibleRentalTypePagingDTO
  ) {
    return await this.rentalTypeService.findPagingPossibleRentalTypesBySpaceIdWithMonth(spaceId, query);
  }
}
