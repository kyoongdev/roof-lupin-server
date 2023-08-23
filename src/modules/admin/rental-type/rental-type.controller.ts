import { Get, Param } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { RentalTypeDTO } from '@/modules/rental-type/dto';
import { ApiController } from '@/utils';

import { AdminRentalTypeService } from './rental-type.service';

@ApiController('rental-types', '[관리자] 대여 타입 관리')
export class AdminRentalTypeController {
  constructor(private readonly rentalTypeService: AdminRentalTypeService) {}

  @Get(':spaceId')
  @RequestApi({
    summary: {
      description: '공간 대여 타입 불러오기',
      summary: '공간 대여 타입 불러오기',
    },
  })
  @ResponseApi({
    type: RentalTypeDTO,
    isArray: true,
  })
  async getSpaceRentalTypes(@Param('spaceId') spaceId: string) {
    return await this.rentalTypeService.getSpaceRentalTypes(spaceId);
  }
}
