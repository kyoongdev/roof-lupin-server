import { Get } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { LocationService } from './location.service';

@ApiController('locations', '지도 / 위치 ')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('naver/geocode')
  @RequestApi({
    summary: {
      description: '네이버 지도 API를 이용하여 주소를 좌표로 변환합니다.',
      summary: '네이버 지도 API를 이용하여 주소를 좌표로 변환합니다.',
    },
  })
  @ResponseApi({})
  async findNaverLocation() {
    return await this.locationService.findNaverLocation();
  }
}
