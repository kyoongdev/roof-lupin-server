import { Get, Query } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { JusoResultDTO } from '@/modules/location/dto';
import { AddressQuery } from '@/modules/location/dto/query';
import { LocationService } from '@/modules/location/location.service';
import { ApiController } from '@/utils';

@ApiController('locations', '[호스트] 위치 ')
export class HostLocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('address')
  @RequestApi({
    summary: {
      description: '주소 검색',
      summary: '주소 검색',
    },
  })
  @ResponseApi({
    type: JusoResultDTO,
  })
  async getAddress(@Query() query: AddressQuery) {
    return await this.locationService.findAddress(query);
  }
}
