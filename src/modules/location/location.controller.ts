import { Get, Query } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { NaverLocationDTO } from './dto';
import { NaverCoordinateLocationDTO } from './dto/naver/naver-coordinate-location.dto';
import { NaverCoordinateQuery, NaverGeocodeQuery } from './dto/query';
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
  @ResponseApi({
    type: NaverLocationDTO,
  })
  async findNaverLocation(@Query() query: NaverGeocodeQuery) {
    return await this.locationService.findNaverLocation(query);
  }

  @Get('naver/coordinate')
  @RequestApi({
    summary: {
      description: '네이버 지도 API를 이용하여 좌표를 주소로 변환합니다.',
      summary: '네이버 지도 API를 이용하여 좌표를 주소로 변환합니다.',
    },
  })
  @ResponseApi({
    type: NaverCoordinateLocationDTO,
  })
  async findNaverLocationByCoordinate(@Query() query: NaverCoordinateQuery) {
    return await this.locationService.findNaverLocationByCoordinate(query);
  }
}
