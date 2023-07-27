import { Injectable } from '@nestjs/common';

import { SocialLocationService } from 'cumuco-nestjs';

import { NaverCoordinateLocationDTO } from './dto/naver/naver-coordinate-location.dto';
import { NaverCoordinateQuery, NaverGeocodeQuery } from './dto/query';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly socialLocationService: SocialLocationService
  ) {}

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
