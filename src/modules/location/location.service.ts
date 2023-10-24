import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';
import { SocialLocationService } from 'cumuco-nestjs';

import { AddressResult } from '@/interface/location.interface';

import { JusoResultDTO } from './dto';
import { NaverCoordinateLocationDTO } from './dto/naver/naver-coordinate-location.dto';
import { AddressQuery, NaverCoordinateQuery, NaverGeocodeQuery } from './dto/query';
import { KakaoKeywordQuery } from './dto/query/kakao-keyword.query';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  private locationApiClient = axios.create({
    baseURL: 'https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do',
  });
  constructor(
    private readonly socialLocationService: SocialLocationService,
    private readonly configService: ConfigService
  ) {}

  async findAddress(query: AddressQuery) {
    const response = await this.locationApiClient.get<string>('', {
      params: {
        confmKey: this.configService.get('LOCATION_KEY'),
        currentPage: query.page,
        countPerPage: query.limit,
        keyword: query.keyword,
        resultType: 'json',
      },
    });
    const result = JSON.parse(response.data.slice(1, -1) as string) as AddressResult;
    result.results.juso = await Promise.all(
      result.results.juso.map(async (juso) => {
        const kakaoResponse = await this.socialLocationService.getKakaoLocationByAddress({ address: juso.jibunAddr });
        const kakaoJuso = kakaoResponse.data[0];

        return { ...juso, latitude: kakaoJuso.y, longitude: kakaoJuso.x };
      })
    );
    return new JusoResultDTO(result);
  }

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
      console.error(err);
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
