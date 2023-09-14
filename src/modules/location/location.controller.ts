import { Get, Query } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { NaverLocationDTO } from './dto';
import { KakaoKeywordDTO } from './dto/kakao/kakao-keyword.dto';
import { NaverCoordinateLocationDTO } from './dto/naver/naver-coordinate-location.dto';
import { NaverCoordinateQuery, NaverGeocodeQuery } from './dto/query';
import { KakaoKeywordQuery } from './dto/query/kakao-keyword.query';
import { LocationService } from './location.service';

@ApiController('locations', '지도 / 위치 ')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('address')
  @RequestApi({
    summary: {
      description: '주소를 검색합니다.',
      summary: '주소 검색',
    },
  })
  @ResponseApi({
    type: KakaoKeywordDTO,
  })
  async findAddress() {
    return await this.locationService.findAddress();
  }

  @Get('kakao/subway')
  @RequestApi({
    summary: {
      description: '카카오 지도 API를 이용하여 지하철역을 검색합니다.',
      summary: '카카오 지도 API를 이용하여 지하철역을 검색합니다.',
    },
  })
  @ResponseApi({
    type: KakaoKeywordDTO,
  })
  async findKakaoSubway(@Query() query: KakaoKeywordQuery) {
    return await this.locationService.findKakaoSubway(query);
  }

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
