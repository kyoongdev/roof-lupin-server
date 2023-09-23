import { Get, Query } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { JusoResultDTO } from '@/modules/location/dto';
import { KakaoKeywordDTO } from '@/modules/location/dto/kakao/kakao-keyword.dto';
import { AddressQuery } from '@/modules/location/dto/query';
import { KakaoKeywordQuery } from '@/modules/location/dto/query/kakao-keyword.query';
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
}
