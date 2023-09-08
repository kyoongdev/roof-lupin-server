import { Injectable } from '@nestjs/common';

import { SocialLocationService } from 'cumuco-nestjs';

import { NaverCoordinateLocationDTO } from './dto/naver/naver-coordinate-location.dto';
import { NaverCoordinateQuery, NaverGeocodeQuery } from './dto/query';
import { KakaoKeywordQuery } from './dto/query/kakao-keyword.query';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(private readonly socialLocationService: SocialLocationService) {}

  async findKakaoSubway(query: KakaoKeywordQuery) {
    try {
      const response = await this.socialLocationService.getKakaoLocationByKeyword({
        keyword: query.keyword,

        category_group_code: '지하철역',
        page: query.page,
        limit: query.limit,
      });
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findNaverLocation(query: NaverGeocodeQuery) {
    const { latitude, longitude, ...rest } = query;

    return await this.socialLocationService.getNaverLocation({
      ...rest,
      coordinate:
        latitude && longitude
          ? {
              latitude,
              longitude,
            }
          : undefined,
    });
  }

  async findNaverLocationByCoordinate(query: NaverCoordinateQuery) {
    const data = await this.socialLocationService.getNaverReverseLocation({
      coordinate: {
        latitude: query.latitude,
        longitude: query.longitude,
      },
      output: 'json',
      orders: 'admcode',
    });

    if (!data || data.length === 0)
      return new NaverCoordinateLocationDTO({
        ...query,
        address: null,
      });
    const { region } = data[0];

    const address = Object.entries(region)
      .reduce<string>((acc, [key, value]) => {
        if (key !== 'area0' && value.name.length !== 0) {
          acc += value.name + ' ';
        }

        return acc;
      }, '')
      .trim();

    return new NaverCoordinateLocationDTO({
      ...query,
      address,
    });
  }
}
