import { Get, Param } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { RentalTypeDTO, SpaceRentalTypeDTO } from '../dto/rentalType';

import { RentalTypeService } from './rentalType.service';

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
  async getSpaceRentalTypes(@Param('spaceId') spaceId: string) {
    return await this.rentalTypeService.findSpaceRentalTypes(spaceId);
  }
}
