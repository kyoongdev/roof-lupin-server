import { Injectable } from '@nestjs/common';

import { SocialLocationService } from 'wemacu-nestjs';

import { NaverGeocodeQuery } from './dto/query';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly socialLoginService: SocialLocationService
  ) {}

  async findNaverLocation(query: NaverGeocodeQuery) {
    const { latitude, longitude, ...rest } = query;

    return await this.socialLoginService.getNaverLocation({
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
}
